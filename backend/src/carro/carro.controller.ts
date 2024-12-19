/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CarroService } from './carro.service';
import { CreateCarroDto } from './dto/create-carro.dto';
import { UpdateCarroDto } from './dto/update-carro.dto';

@Controller('carro')
export class CarroController {
  constructor(private readonly carroService: CarroService) {}

  @Post()
  create(@Body() createCarroDto: CreateCarroDto) {
    return this.carroService.create(createCarroDto);
  }

  @Get()
  findAll() {
    return this.carroService.findAll();
  }

  @Get(':motoristaId')
  findMotoristaById(@Param('motorista') motorista: string){
    return this.carroService.findMotoristaById(motorista);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carroService.remove(+id);
  }
}
