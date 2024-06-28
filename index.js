"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const dataloader_1 = require("./dataloader");
const reportGenerator_1 = require("./reportGenerator");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const subjects = yield (0, dataloader_1.loadMasterData)('MasterData.csv');
        const studentMarks = yield (0, dataloader_1.loadStudentMarks)('StudentMarks.csv');
        rl.question('Which report would you like to generate? (1-4): ', (reportType) => {
            switch (reportType) {
                case '1':
                    rl.question('Enter the student name for report: ', (studentName) => {
                        (0, reportGenerator_1.generateStudentReport)(subjects, studentMarks, studentName);
                        rl.close();
                    });
                    break;
                case '2':
                    (0, reportGenerator_1.generateFailedStudentsReport)(subjects, studentMarks);
                    rl.close();
                    break;
                case '3':
                    subjects.forEach((subject) => {
                        (0, reportGenerator_1.generateHighestMarksReport)(studentMarks, subject.SubjectName);
                    });
                    rl.close();
                    break;
                case '4':
                    (0, reportGenerator_1.generateSubjectPassPercentageReport)(subjects, studentMarks);
                    rl.close();
                    break;
                default:
                    console.log('Invalid option, please select a number between 1 and 4.');
                    rl.close();
                    break;
            }
        });
    });
}
main();
