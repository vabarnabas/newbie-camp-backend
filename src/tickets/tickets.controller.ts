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
import { Ticket } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  findAll(): Promise<Ticket[]> {
    return this.prismaService.ticket.findMany();
  }

  @Get(':id')
  async findSpecificById(@Param('id') id: string): Promise<Ticket> {
    const ticket = await this.prismaService.ticket.findUnique({
      where: { id },
    });

    if (!ticket) {
      throw new ForbiddenException('Access denied.');
    }

    return ticket;
  }

  @Post()
  async create(@Body() createTicketInput: Ticket) {
    return await this.prismaService.ticket.create({
      data: createTicketInput,
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTicketInput: Ticket) {
    const tickets = await this.prismaService.ticket.findMany({
      where: { id },
    });

    if (tickets.length === 0) throw new ForbiddenException('Access denied.');

    return await this.prismaService.ticket.update({
      where: { id: tickets?.[0]?.id },
      data: updateTicketInput,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.prismaService.ticket.delete({
      where: { id },
    });
  }
}
