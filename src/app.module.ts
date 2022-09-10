import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { TicketsModule } from './tickets/tickets.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [PrismaModule, TicketsModule, AnswerModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
