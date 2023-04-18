import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as csvtojson from 'csvtojson';
import { User } from 'src/user/entities/user.entity';
import { Balance } from '@prisma/client';

const today = new Date();
today.setHours(0, 0, 0, 0);
@Injectable()
export class BalanceService {
  constructor(private readonly prisma: PrismaService) {}

  async findTodayBalances(user: User) {
    const balances = await this.prisma.balance.findMany({
      where: {
        userId: user.id,
        createdAt: {
          gte: today,
        },
      },
    });

    return balances;
  }

  async removeBalanceLogically(balances: Array<Balance>): Promise<void> {
    await this.prisma.balance.updateMany({
      data: { deletedAt: today },
      where: { id: { in: balances.map((balance) => balance.id) } },
    });
  }

  async createBalances(csv: string, user: User): Promise<void> {
    const balanceArray = await csvtojson({
      delimiter: ';',
    }).fromString(csv);

    const balancesToday = await this.findTodayBalances(user);

    const balancesFound = balancesToday.length !== 0;

    if (balancesFound) {
      await this.removeBalanceLogically(balancesToday);
    }

    const balances = balanceArray.map((row) => ({
      document: row.documento_recebedor,
      balance: parseFloat(row.valor.replace(',', '.')),
      date: row.data_do_lancamento_financeiro,
      userId: user.id,
    }));

    await this.prisma.balance.createMany({
      data: balances,
    });
  }
}
