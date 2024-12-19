/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCorridaDto } from './dto/create-corrida.dto';
import { UpdateCorridaDto } from './dto/update-corrida.dto';
import { Corrida } from './entities/corrida.entity';
import { Passageiro } from 'src/passageiro/entities/passageiro.entity';
import { Motorista } from 'src/motorista/entities/motorista.entity';

@Injectable()
export class CorridaService {
  constructor(
    @Inject('CORRIDA_REPOSITORY')
    private corridaRepository: Repository<Corrida>,
    @Inject('PASSAGEIRO_REPOSITORY')
    private passageiroRepository: Repository<Passageiro>,

    @Inject('MOTORISTA_REPOSITORY')
    private motoristaRepository: Repository<Motorista>,
  ){}

  async create(createCorridaDto: CreateCorridaDto) {
    const passageiros = await this.passageiroRepository.findByIds(createCorridaDto.passageirosIds);
    const motorista = await this.motoristaRepository.findOne({ where: { id: createCorridaDto.motoristaId } });

    if (passageiros.length === 0 || !motorista) {
        throw new Error('Passageiro(s) ou Motorista não encontrado(s)');
    }

    const corrida = this.corridaRepository.create({
        passageiros,
        motorista,
        tempoCorrida: createCorridaDto.tempoCorrida,
        distanciaCorrida: createCorridaDto.distanciaCorrida
    });

    return this.corridaRepository.save(corrida);
  }

  findAll() {
    return this.corridaRepository.find({ relations: ['passageiros', 'motorista'] });
  }
    // Método para buscar corrida por ID
    async findOne(id: number): Promise<Corrida> {
      const corrida = await this.corridaRepository.findOne({ where: { id }, relations: ['passageiros', 'motorista'] });
      if (!corrida) {
        throw new NotFoundException(`Corrida com ID ${id} não encontrada`);
      }
      return corrida;
    }

  findByCondition(condition: Partial<Corrida>){
    return this.corridaRepository.findOne({ where: condition});
  }

  async update(id: number, UpdateCorridaDto: UpdateCorridaDto) {
    const todo = await this.corridaRepository.findOne({ where: {  id } })
    Object.assign(todo, UpdateCorridaDto);

    return await this.corridaRepository.save(todo);
  }

  remove(id: number) {
    return this.corridaRepository.delete(id);
  }
}
