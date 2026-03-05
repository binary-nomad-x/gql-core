import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  showSalaaam(): string {
    return 'assalam o alaiakum form the api and the method showSalaaam';
  }
}
