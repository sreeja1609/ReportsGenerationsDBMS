import * as readline from 'readline';
import { loadMasterData, loadStudentMarks } from './dataloader';
import { generateStudentReport, generateFailedStudentsReport, generateHighestMarksReport, generateSubjectPassPercentageReport } from './reportGenerator';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  const subjects = await loadMasterData('MasterData.csv');
  const studentMarks = await loadStudentMarks('StudentMarks.csv');

  rl.question('Which report would you like to generate? (1-4): ', (reportType) => {
    switch (reportType) {
      case '1':
        rl.question('Enter the student name for report: ', (studentName) => {
          generateStudentReport(subjects, studentMarks, studentName);
          rl.close();
        });
        break;
      case '2':
        generateFailedStudentsReport(subjects, studentMarks);
        rl.close();
        break;
      case '3':
        subjects.forEach((subject) => {
          generateHighestMarksReport(studentMarks, subject.SubjectName);
        });
        rl.close();
        break;
      case '4':
        generateSubjectPassPercentageReport(subjects, studentMarks);
        rl.close();
        break;
      default:
        console.log('Invalid option, please select a number between 1 and 4.');
        rl.close();
        break;
    }
  });
}

main();
