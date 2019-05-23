import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { StudentService } from './student.service';
import { ApiService } from './api.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [ApiService, StudentService],
})
export class AppModule {}
