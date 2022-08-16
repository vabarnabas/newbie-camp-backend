import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TicketsController } from './tickets.controller';

@Module({
  imports: [PrismaModule],
  controllers: [TicketsController],
})
export class UsersModule {}
