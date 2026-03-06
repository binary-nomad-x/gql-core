import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  showSalaaam(): string {
    return 'assalam o alaiakum from the api and the base/root showSalaaam';
  }
}
