import { Injectable } from '@nestjs/common';
import { parse } from 'papaparse';
import { PrismaService } from 'src/prisma/prisma.service';
import { Readable } from 'stream';

@Injectable()
export class BalanceService {
  constructor(private readonly prisma: PrismaService) {}

  async createBalances(fileBufferInBase64: string): Promise<void> {
    const buffer = Buffer.from(fileBufferInBase64, 'base64');
    const dataStream = Readable.from(buffer);
    const parsedCsv = parse(dataStream, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log('results:', results);
      },
    });
  }
}
