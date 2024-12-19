/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCarroDto } from './dto/create-carro.dto';
import { UpdateCarroDto } from './dto/update-carro.dto';
import { Carro } from './entities/carro.entity';

@Injectable()
export class CarroService {
  constructor(
    @Inject('CARRO_REPOSITORY')
    private carroRepository: Repository<Carro>,
  ){}
  create(CreateCarroDto: CreateCarroDto) {
    return this.carroRepository.save(CreateCarroDto);
  }

  findAll() {
    return this.carroRepository.find();
  }

  findByCondition(condition: Partial<Carro>){
    return this.carroRepository.findOne({ where: condition});
  }

  //Achando o carro pelo ID
  findMotoristaById(motorista: string){
    return this.carroRepository.findOne({ where: { motorista }});
  }

  async update(id: number, UpdateCarroDto: UpdateCarroDto) {
    const todo = await this.carroRepository.findOne({ where: {  id } })
    Object.assign(todo, UpdateCarroDto);

    return await this.carroRepository.save(todo);
  }

  remove(id: number) {
    return this.carroRepository.delete(id);
  }
}
