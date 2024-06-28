import { Subject, StudentMark } from './models';

export function generateStudentReport(
  subjects: Subject[],
  studentMarks: StudentMark[],
  studentName: string
) {
  const studentSubjects = studentMarks.filter((mark) => mark.StudentName === studentName);
  if (studentSubjects.length < 5) {
    console.log(`${studentName} has not appeared in the minimum required 5 subjects.`);
    return;
  }

  let totalMarksObtained = 0;
  let totalMaxMarks = 0;
  let passCount = 0;

  studentSubjects.forEach((mark) => {
    const subject = subjects.find((subj) => subj.SubjectName === mark.SubjectName);
    if (subject) {
      totalMarksObtained += mark.MarksObtained;
      totalMaxMarks += subject.TotalMarks;
      if (mark.MarksObtained >= (subject.TotalMarks * subject.PassPercentage) / 100) {
        passCount++;
      }
    }
  });

  const percentage = (totalMarksObtained / totalMaxMarks) * 100;
  const passFail = passCount >= studentSubjects.length * 0.4 ? 'Pass' : 'Fail';

  console.log(`${studentName} - Total Marks: ${totalMarksObtained}, Percentage: ${percentage.toFixed(2)}%, ${passFail}`);
}

export function generateFailedStudentsReport(
  subjects: Subject[],
  studentMarks: StudentMark[]
) {
  const students = Array.from(new Set(studentMarks.map((mark) => mark.StudentName)));
  const failedStudents: string[] = [];

  students.forEach((student) => {
    const studentSubjects = studentMarks.filter((mark) => mark.StudentName === student);
    if (studentSubjects.length >= 5) {
      let totalMarksObtained = 0;
      let totalMaxMarks = 0;
      let passCount = 0;

      studentSubjects.forEach((mark) => {
        const subject = subjects.find((subj) => subj.SubjectName === mark.SubjectName);
        if (subject) {
          totalMarksObtained += mark.MarksObtained;
          totalMaxMarks += subject.TotalMarks;
          if (mark.MarksObtained >= (subject.TotalMarks * subject.PassPercentage) / 100) {
            passCount++;
          }
        }
      });

      const percentage = (totalMarksObtained / totalMaxMarks) * 100;
      if (passCount < studentSubjects.length * 0.4 || percentage < 40) {
        failedStudents.push(student);
      }
    }
  });

  console.log(`Total Failed Students: ${failedStudents.length}`);
  console.log('Failed Students:', failedStudents.join(', '));
}

export function generateHighestMarksReport(
  studentMarks: StudentMark[],
  subjectName: string
) {
  const subjectMarks = studentMarks.filter((mark) => mark.SubjectName === subjectName);
  const highestMark = Math.max(...subjectMarks.map((mark) => mark.MarksObtained));
  const topStudents = subjectMarks.filter((mark) => mark.MarksObtained === highestMark).map((mark) => mark.StudentName);

  console.log(`Subject: ${subjectName}, Highest Marks: ${highestMark}`);
  console.log('Top Students:', topStudents.join(', '));
}

export function generateSubjectPassPercentageReport(
  subjects: Subject[],
  studentMarks: StudentMark[]
) {
  const subjectPassPercentages: { [key: string]: number } = {};

  subjects.forEach((subject) => {
    const subjectMarks = studentMarks.filter((mark) => mark.SubjectName === subject.SubjectName);
    const passCount = subjectMarks.filter((mark) => mark.MarksObtained >= (subject.TotalMarks * subject.PassPercentage) / 100).length;
    subjectPassPercentages[subject.SubjectName] = (passCount / subjectMarks.length) * 100;
  });

  const highestPassSubject = Object.keys(subjectPassPercentages).reduce((a, b) => (subjectPassPercentages[a] > subjectPassPercentages[b] ? a : b));
  const lowestPassSubject = Object.keys(subjectPassPercentages).reduce((a, b) => (subjectPassPercentages[a] < subjectPassPercentages[b] ? a : b));

  console.log(`Subject with Highest Pass Percentage: ${highestPassSubject}, ${subjectPassPercentages[highestPassSubject].toFixed(2)}%`);
  console.log(`Subject with Lowest Pass Percentage: ${lowestPassSubject}, ${subjectPassPercentages[lowestPassSubject].toFixed(2)}%`);
}
