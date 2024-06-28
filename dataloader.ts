import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import { Subject, StudentMark } from './models';

export async function loadMasterData(filePath: string): Promise<Subject[]> {
  return new Promise((resolve, reject) => {
    const subjects: Subject[] = [];
    fs.createReadStream(path.resolve(filePath))
      .pipe(csv())
      .on('data', (row) => {
        subjects.push({
          SubjectName: row.SubjectName,
          TotalMarks: Number(row.TotalMarks),
          PassPercentage: Number(row.PassPercentage),
        });
      })
      .on('end', () => {
        resolve(subjects);
      })
      .on('error', reject);
  });
}

export async function loadStudentMarks(filePath: string): Promise<StudentMark[]> {
  return new Promise((resolve, reject) => {
    const studentMarks: StudentMark[] = [];
    fs.createReadStream(path.resolve(filePath))
      .pipe(csv())
      .on('data', (row) => {
        studentMarks.push({
          StudentName: row.StudentName,
          SubjectName: row.SubjectName,
          MarksObtained: Number(row.MarksObtained),
        });
      })
      .on('end', () => {
        resolve(studentMarks);
      })
      .on('error', reject);
  });
}
