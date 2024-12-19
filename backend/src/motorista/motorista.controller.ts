/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Patch } from '@nestjs/common';
import { MotoristaService } from './motorista.service';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';

@Controller('motorista')
export class MotoristaController {
  constructor(private readonly motoristaService: MotoristaService) {}

  @Post()
  create(@Body() createMotoristaDto: CreateMotoristaDto) {
    return this.motoristaService.create(createMotoristaDto);
  }

  @Get()
  findAll() {
    return this.motoristaService.findAll();
  }

  @Get(':id')
  findId(@Param('id') id: number){
    return this.motoristaService.findId(id)
  }

  @Get('email/:email')
  findEmail(@Param('email') email: string){
    return this.motoristaService.findEmail(email)
  }

  @Get(':email/:senha')
  FindUser(@Param('email') email: string, @Param('senha') senha: string){
    return this.motoristaService.findUser(email, senha);
  }

  @Get('/cpf/:cpf')
  findCpf(@Param('cpf') cpf: string){
    return this.motoristaService.findCpf(cpf);
  }

  @Get('/tel/:telefone')
  findOne(@Param('telefone') telefone: string){
    return this.motoristaService.findTelefone(telefone);
  }

  @Put('/update/:id')
  update(@Param('id') id: number, @Body() updateMotoristaDto: UpdateMotoristaDto) {
    return this.motoristaService.update(id, updateMotoristaDto);
  }

  @Patch('/motoristaCarro/:id/')
  updateCarroId(@Param('id') id: number, @Body() UpdateMotoristaDto: UpdateMotoristaDto){
    return this.motoristaService.updateCarroId(id, UpdateMotoristaDto);
  }

  @Patch('/motorista/:id/')
    updateMotorista(@Param('id') id: number, @Body() UpdateMotoristaDto: UpdateMotoristaDto){
      return this.motoristaService.updateMotorista(id, UpdateMotoristaDto);
    }
}
