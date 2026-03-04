# PlanifyLab — Lab scheduling

Lab analysis scheduling tool: assigns samples to technicians and equipment based on priorities, time slots, and type compatibility (blood, urine, etc.), with efficiency metrics.

## Project structure

```
simpleVersion/
├── javaScript_version/     # JavaScript version (ES modules)
│   ├── planifyLab.js       # Scheduling algorithm
│   ├── testCases.js       # Test datasets (testData1 to 6)
│   └── index.js            # Entry point
├── typeScript_version/     # TypeScript version
│   ├── planifyLab.ts       # Algorithm + types
│   ├── testCases.ts        # Typed test cases
│   └── index.ts            # Entry point
├── package.json
└── README.md
```

## Prerequisites

- **Node.js** 18+ (ES modules)
- For the TypeScript version: **tsx** (included as devDependency)

## Installation

```bash
npm install
```

## Running the project

**JavaScript version:**

```bash
node javaScript_version/index.js
```

**TypeScript version:**

```bash
npx tsx typeScript_version/index.ts
```

To try a different dataset, change the import and call in `index.js` or `index.ts` (e.g. `planifyLab(testData6)`).

## Data format

### Input (`planifyLab(data)`)

| Key | Description |
|-----|-------------|
| `samples` | List of samples to schedule |
| `technicians` | List of available technicians |
| `equipment` | List of available equipment |

**Sample:** `id`, `type` (e.g. `"BLOOD"`, `"URINE"`), `priority` (`"STAT"` \| `"URGENT"` \| `"ROUTINE"`), `analysisTime` (minutes), `arrivalTime` (e.g. `"09:00"`), `patientId`.

**Technician:** `id`, `speciality` (`"BLOOD"`, `"URINE"`, or `"GENERAL"`), `startTime`, `endTime` (e.g. `"08:00"`, `"17:00"`).

**Equipment:** `id`, `type` (e.g. `"BLOOD"`, `"URINE"`), `available` (boolean).

### Output

- **`schedule`**: array of scheduled slots  
  - `sampleId`, `technicianId`, `equipmentId`, `startTime`, `endTime`, `priority`
- **`metrics`**:
  - **`totalTime`**: duration (minutes) from the first scheduled sample’s arrival to the end of the last analysis
  - **`efficiency`**: (sum of analysis durations) / (duration from first analysis start to last analysis end), capped at 100%
  - **`conflicts`**: number of resource conflicts detected (0 if the schedule is consistent)

## Scheduling rules

- **Priority:** STAT > URGENT > ROUTINE; same priority ordered by arrival time.
- **Compatibility:** a technician can handle a type if they have the matching speciality or `"GENERAL"`; equipment must have the same `type` as the sample.
- **Availability:** each slot respects technicians’ time windows, sample arrival time, and equipment availability.
- **Parallelism:** multiple analyses can run at the same time when distinct technicians and equipment are available (e.g. BLOOD on one pair, URINE on another).

## Test cases

| Set | Description |
|-----|-------------|
| testData1 | 1 BLOOD sample, 1 technician, 1 equipment |
| testData2 | 2 BLOOD (URGENT + STAT), 2 BLOOD technicians, 2 BLOOD equipment, arrivals at 09:00 |
| testData3 | 2 BLOOD + 1 URINE, 2 technicians (BLOOD + GENERAL), 2 equipment (BLOOD + URINE), arrivals at 09:00 |
| testData4 | 2 BLOOD + 2 URINE, 1 BLOOD + 1 URINE technician, 2 equipment (BLOOD + URINE) |
| testData5 | 4 samples (BLOOD + URINE), 2 GENERAL technicians, 2 equipment, all at 09:00 |
| testData6 | 6 samples (BLOOD + URINE), mixed priorities, 2 technicians, 2 equipment, last arrival at 12:00 (efficiency < 100%) |


