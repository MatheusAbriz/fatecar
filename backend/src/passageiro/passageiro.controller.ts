/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put} from '@nestjs/common';
import { PassageiroService } from './passageiro.service';
import { CreatePassageiroDto } from './dto/create-passageiro.dto';
import { UpdatePassageiroDto } from './dto/update-passageiro.dto';
import { get } from 'http';

@Controller('passageiro')
export class PassageiroController {
  constructor(private readonly passageiroService: PassageiroService) {}

  @Post()
  create(@Body() createPassageiroDto: CreatePassageiroDto) {
    return this.passageiroService.create(createPassageiroDto);
  }

  @Put('/update/:id')
  update(@Param('id') id: number, @Body() UpdatePassageiroDto: UpdatePassageiroDto){
    return this.passageiroService.update(id, UpdatePassageiroDto)
  }


  @Get()
  findAll() {
    return this.passageiroService.findAll();
  }

  @Get(':id')
  findId(@Param('id') id: number){
    return this.passageiroService.findId(id);
  }

  @Get('email/:email')
  findEmail(@Param('email') email: string){
    return this.passageiroService.findEmail(email);
  }

  @Get(':email/:senha')
  FindUser(@Param('email') email: string, @Param('senha') senha: string){
    return this.passageiroService.findUser(email, senha);
  }

  @Get('/cpf/:cpf')
  findCpf(@Param('cpf') cpf: string){
    return this.passageiroService.findCpf(cpf);
  }


  @Get('/tel/:telefone')
  findOne(@Param('telefone') telefone: string){
    return this.passageiroService.findTelefone(telefone);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passageiroService.remove(+id);
  }
}
