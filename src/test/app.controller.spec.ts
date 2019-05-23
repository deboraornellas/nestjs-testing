import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { ApiService } from '../api.service';
import { StudentService } from '../student.service';

class StudentServiceMock {
  async getGPA(firstName: string, lastName: string): Promise<any> {
    return 3.8;
  }

  async getStudent(firstName: string, lastName: string): Promise<any> {
    return Promise.resolve({
      name: 'Jane Doe',
      grades: [3.6, 3.8, 3.8, 4.0, 3.4],
    });
  }
}

describe('AppController', () => {
  let appModule: TestingModule;
  let studentService: StudentService;
  let appController: AppController;

  beforeAll(async () => {
    appModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: StudentService,
          useClass: StudentServiceMock,
        },
      ],
    }).compile();

    studentService = appModule.get<StudentService>(StudentService);
    appController = appModule.get<AppController>(AppController);
  });

  const mockQuery = {
    firstName: 'Jane',
    lastName: 'Doe',
  };

  const mockStudent = Promise.resolve({
    name: 'Jane Doe',
    grades: [3.6, 3.8, 3.8, 4.0, 3.4],
  });

  const mockGPA = 3.8;

  describe('getStudentGpa', () => {
    it('should return the correct GPA if the student exists', () => {
      jest
        .spyOn(studentService, 'getStudent')
        .mockImplementation(() => mockStudent);
      expect(
        appController.getStudentGpa(mockQuery.firstName, mockQuery.lastName),
      ).toBe(mockGPA);
    });

    it('should throw an error if the student exists', () => {
      expect(
        appController.getStudentGpa(mockQuery.firstName, mockQuery.lastName),
      ).toBe(mockGPA);
    });
  });
});
