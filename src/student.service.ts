import { Injectable, HttpException } from '@nestjs/common';
import { ApiService } from './api.service';

interface Student {
  name: string;
  grades: number[];
}

@Injectable()
export class StudentService {
  constructor(private apiService: ApiService) {}

  public async getGpa(firstName: string, lastName: string): Promise<number> {
    const student: Student = await this.apiService.getStudent(
      firstName,
      lastName,
    );

    if (!student || !student.grades) {
      throw new HttpException('Cannot find student or student grades', 500);
    }

    let gpa: number = 0;

    for (const grade of student.grades) {
      gpa += grade / student.grades.length;
    }

    return gpa;
  }
}
