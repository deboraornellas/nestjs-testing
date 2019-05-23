import { Injectable } from '@nestjs/common';
import { ApiService } from './api.service';

interface Student {
  name: string;
  grades: number[];
}

@Injectable()
export class StudentService {
  constructor(private apiService: ApiService) {}

  public async getGPA(firstName: string, lastName: string): Promise<number> {
    if (!firstName || !lastName) {
      throw new Error('Incomplete student information');
    }
    const student = await this.getStudent(firstName, lastName);
    return this.calculateGPA(student.grades);
  }

  async getStudent(firstName: string, lastName: string): Promise<Student> {
    const student = await this.apiService.getStudent(firstName, lastName);
    if (!student || !student.grades) {
      throw new Error('Cannot find student or student grades');
    }
    return student;
  }

  calculateGPA(grades: number[]) {
    let gpa: number;
    for (const grade of grades) {
      gpa += grade / grades.length;
    }
    return gpa;
  }
}
