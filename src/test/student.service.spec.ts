import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { ApiService } from '../api.service';
import { StudentService } from '../student.service';

class ApiServiceMock {
  getStudent(firstName: string, lastName: string) {
    return {
      name: 'Jane Doe',
      grades: [3.7, 3.8, 3.9, 4.0, 3.6],
    };
  }
}

describe('StudentService', () => {
  let app: TestingModule;
  let studentService: StudentService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: ApiService,
      useClass: ApiServiceMock,
    };
    app = await Test.createTestingModule({
      providers: [StudentService, ApiServiceProvider],
    }).compile();
    studentService = app.get<StudentService>(StudentService);
  });

  const testStudent = {
    firstName: 'Jane',
    lastName: 'Doe',
  };

  const mockStudentGrades = [3.7, 3.8, 3.9, 4.0, 3.6];
  const mockGPA = 3.8;

  describe('calculateGPA', () => {
    it('should return the correct GPA', () => {
      expect(studentService.calculateGPA(mockStudentGrades)).toBe(mockGPA);
    });
  });

  describe('getStudent', () => {
    it('should return student if it exists', () => {
      expect(
        studentService.getStudent(testStudent.firstName, testStudent.lastName),
      ).toBe({
        name: 'Jane Doe',
        grades: [3.7, 3.8, 3.9, 4.0, 3.6],
      });
    });
    // it('should throw an error if student does not exist', () => {
    //   // jest.spyOn()
    //   expect(
    //     studentService.getStudent(testStudent.firstName, testStudent.lastName),
    //   ).toThrowError();
    // });
    // it('should throw an error if student does not have grades', () => {
    //   expect(studentService.calculateGPA(mockStudentGrades)).toBe(mockGPA);
    // });
  });

  // describe('getGPA', () => {
  //   it('should return the correct GPA if the student exists', () => {
  //     const studentService = app.get<StudentService>(StudentService);
  //     expect(studentService.calculateGPA(mockStudentGrades)).toBe(mockGPA);
  //   });
  // });
});
