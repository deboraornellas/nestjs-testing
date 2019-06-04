import { Controller, Get, Query, HttpException } from '@nestjs/common';
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
      throw new HttpException('Incomplete student information', 400);
    }
    return await this.studentService.getGpa(firstName, lastName);
  }
}
