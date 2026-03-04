import { planifyLab } from "./planifyLab.js";
import { testData1, testData2, testData3, testData4, testData5, testData6 } from "./testCases.js";

const result = planifyLab(testData4);

console.log(JSON.stringify(result, null, 2));