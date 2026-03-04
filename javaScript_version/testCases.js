export const testData1 = {
  samples: [
    {
      id: "S001",
      type: "BLOOD",
      priority: "URGENT",
      analysisTime: 30,
      arrivalTime: "09:00",
      patientId: "P001",
    },
  ],
  technicians: [
    {
      id: "T001",
      name: "Alice Martin",
      speciality: "BLOOD",
      startTime: "08:00",
      endTime: "17:00",
    },
  ],
  equipment: [
    {
      id: "E001",
      name: "Analyseur sang A",
      type: "BLOOD",
      available: true,
    },
  ],
};

export const testData2 = {
  samples: [
    {
      id: "S001",
      type: "BLOOD",
      priority: "URGENT",
      analysisTime: 45,
      arrivalTime: "09:00",
      patientId: "P001",
    },
    {
      id: "S002",
      type: "BLOOD",
      priority: "STAT",
      analysisTime: 30,
      arrivalTime: "09:00",
      patientId: "P002",
    },
  ],
  technicians: [
    {
      id: "T001",
      speciality: "BLOOD",
      startTime: "08:00",
      endTime: "17:00",
    },
    {
      id: "T002",
      speciality: "BLOOD",
      startTime: "08:00",
      endTime: "17:00",
    },
  ],
  equipment: [
    {
      id: "E001",
      type: "BLOOD",
      available: true,
    },
    {
      id: "E002",
      type: "BLOOD",
      available: true,
    },
  ],
};

export const testData3 = {
    "samples": [
      {
        "id": "S001", 
        "type": "BLOOD",
        "priority": "URGENT",
        "analysisTime": 60,
        "arrivalTime": "09:00", 
        "patientId": "P001"
      },
      {
        "id": "S002",
        "type": "URINE",
        "priority": "URGENT",
        "analysisTime": 30,
        "arrivalTime": "09:00",
        "patientId": "P002"
      },
      {
        "id": "S003",
        "type": "BLOOD",
        "priority": "ROUTINE", 
        "analysisTime": 45,
        "arrivalTime": "09:00",
        "patientId": "P003"
      }
    ],
    "technicians": [
      {
        "id": "T001",
        "speciality": "BLOOD",
        "startTime": "08:00", 
        "endTime": "17:00"
      },
      {
        "id": "T002", 
        "speciality": "GENERAL",
        "startTime": "08:00",
        "endTime": "17:00"
      }
    ],
    "equipment": [
      {
        "id": "E001",
        "type": "BLOOD",
        "available": true
      },
      {
        "id": "E002",
        "type": "URINE",
        "available": true
      }
    ]
};

export const testData4 = {
  samples: [
    {
      id: "S001",
      type: "BLOOD",
      priority: "STAT",
      analysisTime: 20,
      arrivalTime: "08:30",
      patientId: "P001",
    },
    {
      id: "S002",
      type: "BLOOD",
      priority: "ROUTINE",
      analysisTime: 25,
      arrivalTime: "08:30",
      patientId: "P002",
    },
    {
      id: "S003",
      type: "URINE",
      priority: "URGENT",
      analysisTime: 30,
      arrivalTime: "08:30",
      patientId: "P003",
    },
    {
      id: "S004",
      type: "URINE",
      priority: "ROUTINE",
      analysisTime: 25,
      arrivalTime: "08:45",
      patientId: "P004",
    },
  ],
  technicians: [
    {
      id: "T001",
      speciality: "BLOOD",
      startTime: "08:00",
      endTime: "17:00",
    },
    {
      id: "T002",
      speciality: "URINE",
      startTime: "08:00",
      endTime: "17:00",
    },
  ],
  equipment: [
    {
      id: "E001",
      type: "BLOOD",
      available: true,
    },
    {
      id: "E002",
      type: "URINE",
      available: true,
    },
  ],
};

export const testData5 = {
  samples: [
    {
      id: "S001",
      type: "BLOOD",
      priority: "STAT",
      analysisTime: 15,
      arrivalTime: "09:00",
      patientId: "P001",
    },
    {
      id: "S002",
      type: "URINE",
      priority: "URGENT",
      analysisTime: 20,
      arrivalTime: "09:00",
      patientId: "P002",
    },
    {
      id: "S003",
      type: "BLOOD",
      priority: "ROUTINE",
      analysisTime: 30,
      arrivalTime: "09:00",
      patientId: "P003",
    },
    {
      id: "S004",
      type: "URINE",
      priority: "ROUTINE",
      analysisTime: 25,
      arrivalTime: "09:00",
      patientId: "P004",
    },
  ],
  technicians: [
    {
      id: "T001",
      speciality: "GENERAL",
      startTime: "08:00",
      endTime: "17:00",
    },
    {
      id: "T002",
      speciality: "GENERAL",
      startTime: "08:00",
      endTime: "17:00",
    },
  ],
  equipment: [
    {
      id: "E001",
      type: "BLOOD",
      available: true,
    },
    {
      id: "E002",
      type: "URINE",
      available: true,
    },
  ],
};

export const testData6 = {
  samples: [
    {
      id: "S001",
      type: "BLOOD",
      priority: "STAT",
      analysisTime: 30,
      arrivalTime: "09:00",
      patientId: "P001",
    },
    {
      id: "S002",
      type: "URINE",
      priority: "URGENT",
      analysisTime: 40,
      arrivalTime: "09:00",
      patientId: "P002",
    },
    {
      id: "S003",
      type: "BLOOD",
      priority: "ROUTINE",
      analysisTime: 45,
      arrivalTime: "09:45",
      patientId: "P003",
    },
    {
      id: "S004",
      type: "URINE",
      priority: "ROUTINE",
      analysisTime: 30,
      arrivalTime: "10:00",
      patientId: "P004",
    },
    {
      id: "S005",
      type: "BLOOD",
      priority: "URGENT",
      analysisTime: 30,
      arrivalTime: "10:30",
      patientId: "P005",
    },
    {
      id: "S006",
      type: "URINE",
      priority: "ROUTINE",
      analysisTime: 35,
      arrivalTime: "12:00",
      patientId: "P006",
    },
  ],
  technicians: [
    {
      id: "T001",
      speciality: "BLOOD",
      startTime: "08:00",
      endTime: "17:00",
    },
    {
      id: "T002",
      speciality: "GENERAL",
      startTime: "08:00",
      endTime: "17:00",
    },
  ],
  equipment: [
    {
      id: "E001",
      type: "BLOOD",
      available: true,
    },
    {
      id: "E002",
      type: "URINE",
      available: true,
    },
  ],
};
