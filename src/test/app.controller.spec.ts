import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { ApiService } from '../api.service';
import { StudentService } from 'src/student.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ApiService, StudentService],
    }).compile();
  });

  const mockQuery = {
    firstName: 'Jane',
    lastName: 'Doe',
  };

  const mockStudent = {
    name: 'Jane Doe',
    grades: [3.6, 3.8, 3.8, 4.0, 3.4],
  };

  const mockGPA = 3.8;

  describe('getStudentGpa', () => {
    it('should return the correct GPA if the student exists', () => {
      const appController = app.get<AppController>(AppController);
      expect(
        appController.getStudentGpa(mockQuery.firstName, mockQuery.lastName),
      ).toBe(mockGPA);
    });

    it('should throw an error if the student exists', () => {
      const appController = app.get<AppController>(AppController);
      expect(
        appController.getStudentGpa(mockQuery.firstName, mockQuery.lastName),
      ).toBe(mockGPA);
    });
  });
});
