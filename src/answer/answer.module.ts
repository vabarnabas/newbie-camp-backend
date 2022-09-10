import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AnswerController } from './answer.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AnswerController],
})
export class AnswerModule {}
