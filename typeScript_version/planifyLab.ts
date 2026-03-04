export type Priority = "STAT" | "URGENT" | "ROUTINE";

export interface Sample {
  id: string;
  type: string;
  priority: Priority;
  analysisTime: number;
  arrivalTime: string;
  patientId: string;
}

export interface Technician {
  id: string;
  name?: string;
  speciality: string;
  startTime: string;
  endTime: string;
}

export interface Equipment {
  id: string;
  name?: string;
  type: string;
  available: boolean;
}

export interface LabData {
  samples: Sample[];
  technicians: Technician[];
  equipment: Equipment[];
}

export interface ScheduleEntry {
  sampleId: string;
  technicianId: string;
  equipmentId: string;
  startTime: string;
  endTime: string;
  priority: Priority;
}

export interface Metrics {
  totalTime: number;
  efficiency: number;
  conflicts: number;
}

export interface PlanifyLabResult {
  schedule: ScheduleEntry[];
  metrics: Metrics;
}

export function planifyLab(data: LabData): PlanifyLabResult {
  const { samples, technicians, equipment } = data;

  // Helpers to convert time
  const toMinutes = (hhmm: string): number => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };

  const toHHMM = (minutes: number): string => {
    const h = Math.floor(minutes / 60)
      .toString()
      .padStart(2, "0");
    const m = (minutes % 60).toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  // Priorities
  const priorityOrder: Record<Priority, number> = {
    STAT: 1,
    URGENT: 2,
    ROUTINE: 3,
  };

  const sortedSamples = [...samples].sort((a, b) => {
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return toMinutes(a.arrivalTime) - toMinutes(b.arrivalTime);
  });

  // Initialization of availability
  const techAvailability: Record<string, number> = {};
  const equipmentAvailability: Record<string, number> = {};

  technicians.forEach((tech) => {
    techAvailability[tech.id] = toMinutes(tech.startTime);
  });

  equipment.forEach((eq) => {
    equipmentAvailability[eq.id] = eq.available ? 0 : Infinity;
  });

  const schedule: ScheduleEntry[] = [];

  // Compatibility check
  const isTechCompatible = (tech: Technician, sample: Sample): boolean => {
    return (
      tech.speciality === sample.type || tech.speciality === "GENERAL"
    );
  };

  const isEquipmentCompatible = (eq: Equipment, sample: Sample): boolean => {
    return eq.type === sample.type;
  };

  // Planning
  for (const sample of sortedSamples) {
    const arrival = toMinutes(sample.arrivalTime);

    let chosenTech: Technician | null = null;
    let chosenEq: Equipment | null = null;
    let earliestStart = Infinity;

    for (const tech of technicians) {
      if (!isTechCompatible(tech, sample)) continue;

      const techFreeAt = Math.max(
        techAvailability[tech.id],
        arrival,
        toMinutes(tech.startTime)
      );

      if (techFreeAt + sample.analysisTime > toMinutes(tech.endTime)) continue;

      for (const eq of equipment) {
        if (!isEquipmentCompatible(eq, sample)) continue;

        const eqFreeAt = equipmentAvailability[eq.id];
        const startTime = Math.max(techFreeAt, eqFreeAt);

        if (startTime < earliestStart) {
          earliestStart = startTime;
          chosenTech = tech;
          chosenEq = eq;
        }
      }
    }

    if (!chosenTech || !chosenEq) continue;

    const endTime = earliestStart + sample.analysisTime;

    techAvailability[chosenTech.id] = endTime;
    equipmentAvailability[chosenEq.id] = endTime;

    schedule.push({
      sampleId: sample.id,
      technicianId: chosenTech.id,
      equipmentId: chosenEq.id,
      startTime: toHHMM(earliestStart),
      endTime: toHHMM(endTime),
      priority: sample.priority,
    });
  }

  // Sort schedule by start time
  schedule.sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime));

  // Metrics
  let totalTime = 0;
  let efficiency = 0;
  let conflicts = 0;

  if (schedule.length > 0) {
    const firstStart = toMinutes(schedule[0].startTime);
    const lastEnd = toMinutes(schedule[schedule.length - 1].endTime);
    const scheduledIds = new Set(schedule.map((e) => e.sampleId));
    const firstArrival = Math.min(
      ...samples
        .filter((s) => scheduledIds.has(s.id))
        .map((s) => toMinutes(s.arrivalTime))
    );

    totalTime = lastEnd - firstArrival;

    const totalAnalysisTime = samples.reduce(
      (sum, s) => sum + s.analysisTime,
      0
    );
    // Efficiency calculation
    const timeWindow = lastEnd - firstStart;
    const rawEfficiency =
      timeWindow > 0 ? (totalAnalysisTime / timeWindow) * 100 : 0;
    efficiency = Number(Math.min(100, rawEfficiency).toFixed(1));
  }

  // Conflict check
  const resourceUsage: Record<string, { start: number; end: number }[]> = {};

  for (const entry of schedule) {
    const start = toMinutes(entry.startTime);
    const end = toMinutes(entry.endTime);

    for (const resourceId of [entry.technicianId, entry.equipmentId]) {
      if (!resourceUsage[resourceId]) {
        resourceUsage[resourceId] = [];
      }

      for (const slot of resourceUsage[resourceId]) {
        if (
          (start >= slot.start && start < slot.end) ||
          (end > slot.start && end <= slot.end)
        ) {
          conflicts++;
        }
      }

      resourceUsage[resourceId].push({ start, end });
    }
  }

  return {
    schedule,
    metrics: {
      totalTime,
      efficiency,
      conflicts,
    },
  };
}
