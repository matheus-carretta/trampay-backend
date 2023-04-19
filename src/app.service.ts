import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1>Acesse as docs para saber mais.</h1>';
  }
}
