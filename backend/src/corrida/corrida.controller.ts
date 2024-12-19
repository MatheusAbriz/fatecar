/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CorridaService } from './corrida.service';
import { CreateCorridaDto } from './dto/create-corrida.dto';
import { UpdateCorridaDto } from './dto/update-corrida.dto';
import { Corrida } from './entities/corrida.entity';

@Controller('corrida')
export class CorridaController {
  constructor(private readonly corridaService: CorridaService) {}

  @Post()
  create(@Body() createCorridaDto: CreateCorridaDto) {
    return this.corridaService.create(createCorridaDto);
  }

  @Get()
  async findAll():Promise<Corrida[]> {
    return this.corridaService.findAll();
  }
  // Endpoint para buscar corrida específica por ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Corrida> {
    return this.corridaService.findOne(id);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCorridaDto: UpdateCorridaDto) {
    return this.corridaService.update(+id, updateCorridaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.corridaService.remove(+id);
  }
}
