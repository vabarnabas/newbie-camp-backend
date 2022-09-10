import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Answer } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('answers')
export class AnswerController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  findAll(): Promise<Answer[]> {
    return this.prismaService.answer.findMany({ include: { ticket: true } });
  }

  @Get(':id')
  async findSpecificById(@Param('id') id: string): Promise<Answer> {
    const answer = await this.prismaService.answer.findUnique({
      where: { id },
      include: { ticket: true },
    });

    if (!answer) {
      throw new ForbiddenException('Access denied.');
    }

    return answer;
  }

  @Post()
  async create(@Body() createAnswerInput: Answer) {
    return await this.prismaService.answer.create({
      data: createAnswerInput,
      include: { ticket: true },
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAnswerInput: Answer) {
    const answer = await this.prismaService.answer.findUnique({
      where: { id },
      include: { ticket: true },
    });

    if (!answer) throw new ForbiddenException('Access denied.');

    return await this.prismaService.answer.update({
      where: { id: answer.id },
      data: updateAnswerInput,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.prismaService.answer.delete({
      where: { id },
    });
  }
}
