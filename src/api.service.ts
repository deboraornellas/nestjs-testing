import { Injectable, HttpService } from '@nestjs/common';

interface Student {
  name: string;
  grades: number[];
}

@Injectable()
export class ApiService {
  constructor(private http: HttpService) {}
  async getStudent(firstName: string, lastName: string): Promise<Student> {
    const url = `....../get-student?firstName=${firstName}&lastName=${lastName}`;
    const response = await this.http.get(url).toPromise();
    if (!response.data) {
      throw new Error('API Error');
    }
    return response.data;
  }
}
