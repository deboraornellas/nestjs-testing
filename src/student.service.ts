import { Injectable } from '@nestjs/common';
import { ApiService } from './api.service';

interface Student {
  name: string;
  grades: number[];
}

@Injectable()
export class StudentService {
  constructor(private apiService: ApiService) {}

  public async getGpa(firstName: string, lastName: string): Promise<number> {
    const student = await this.apiService.getStudent(firstName, lastName);

    if (!student || !student.grades) {
      throw new Error('Cannot find student or student grades');
    }

    let gpa: number = 0;

    for (const grade of student.grades) {
      gpa += grade / student.grades.length;
    }

    return gpa;
  }
}
