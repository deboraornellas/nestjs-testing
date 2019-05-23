import { Controller, Get, Query } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class AppController {
  constructor(private readonly studentService: StudentService) {}

  @Get('/gpa')
  async getStudentGpa(
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
  ): Promise<number> {
    if (!firstName || !lastName) {
      throw new Error('Incomplete student information');
    }

    return await this.studentService.getGPA(firstName, lastName);
  }
}
