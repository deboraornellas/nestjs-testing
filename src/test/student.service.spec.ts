import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from '../api.service';
import { StudentService } from '../student.service';

class ApiServiceMock {
  async getStudent(firstName: string, lastName: string) {
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

  describe('getGpa', () => {
    it('should get student GPA', async () => {
      const expectedGpa = 3.8;
      const gpa = await studentService.getGpa('Jane', 'Doe');

      expect(gpa).toEqual(expectedGpa);
    });
  });
});
