import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createBalances(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
