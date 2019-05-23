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
    return await this.studentService.getGPA(firstName, lastName);
  }
}
