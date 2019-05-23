import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { ApiService } from '../api.service';
import { StudentService } from 'src/student.service';

describe('StudentService', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ApiService, StudentService],
    }).compile();
  });

  const testStudent = {
    firstName: 'Jane',
    lastName: 'Doe',
  };

  const mockStudentGrades = [3.6, 3.8, 3.8, 4.0, 3.4];
  const mockGPA = 3.8;

  describe('calculateGPA', () => {
    it('should return the correct GPA', () => {
      const studentService = app.get<StudentService>(StudentService);
      expect(studentService.calculateGPA(mockStudentGrades)).toBe(mockGPA);
    });
  });
});
