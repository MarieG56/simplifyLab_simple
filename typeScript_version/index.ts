import { planifyLab } from "./planifyLab.ts";
import { testData1, testData2, testData3, testData4, testData5, testData6 } from "./testCases.ts";

const result = planifyLab(testData3);

console.log(JSON.stringify(result, null, 2));
