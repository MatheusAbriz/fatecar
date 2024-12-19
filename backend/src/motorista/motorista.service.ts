/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Motorista } from './entities/motorista.entity';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';

@Injectable()
export class MotoristaService {
  constructor(
    @Inject('MOTORISTA_REPOSITORY')
    private motoristaRepository: Repository<Motorista>,
  ){}
  create(createMotoristaDto: CreateMotoristaDto) {
    return this.motoristaRepository.save(createMotoristaDto);
  }

  findAll() {
    return this.motoristaRepository.find();
  }

  //Criando um 'construtor'
  async findByCondition(condition: Partial<Motorista>){
    return await this.motoristaRepository.findOne({ where: condition});
  }

  //Achando usuario pelo id
  findId(id: number){
    return this.findByCondition({ id });
  }

  //Achando usuario pelo email
  findEmail(email: string){
    return this.findByCondition({ email });
  }

  //Achando usuario pelo email e senha
  findUser(email: string, senha: string){
    return this.findByCondition({ email, senha });
  }

  //Get pelo CPF
  findCpf(cpf: string){
    return this.findByCondition({ cpf });
  }

  //Get pelo telefone
  findTelefone(telefone: string){
    return this.findByCondition({ telefone });
  }

  //Update da URL da foto do motorista
  async update(id: number, UpdateMotoristaDto: UpdateMotoristaDto) {
    const todo = await this.motoristaRepository.findOne({ where: {  id } })
    Object.assign(todo, UpdateMotoristaDto);

    return await this.motoristaRepository.save(todo);
  }

  //Update do ID do carro e motorista
  async updateCarroId(id: number, UpdateMotoristaDto: UpdateMotoristaDto){
    const motorista = await this.motoristaRepository.findOne({ where: { id }});
    Object.assign(motorista, UpdateMotoristaDto);

    return await this.motoristaRepository.save(motorista);
  }

  //Update do status de corrida
  async updateMotorista(id: number, UpdateMotoristaDto: UpdateMotoristaDto){
    const motorista = await this.motoristaRepository.findOne({ where: { id } });
    Object.assign(motorista, UpdateMotoristaDto);

    return await this.motoristaRepository.save(motorista);
  }

  remove(id: number) {
    return this.motoristaRepository.delete(id);
  }
}
