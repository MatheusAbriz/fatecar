/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Passageiro } from './entities/passageiro.entity';
import { CreatePassageiroDto } from './dto/create-passageiro.dto';
import { UpdatePassageiroDto } from './dto/update-passageiro.dto';

@Injectable()
export class PassageiroService {
  constructor(
    @Inject('PASSAGEIRO_REPOSITORY')
    private passageiroRepository: Repository<Passageiro>,
  ){}
  create(createPassageiroDto: CreatePassageiroDto) {
    return this.passageiroRepository.save(createPassageiroDto);
  }

  findAll() {
    return this.passageiroRepository.find();
  }

  findByCondition(condition: Partial<Passageiro>){
    return this.passageiroRepository.findOne({ where: condition});
  }

  //FindById
  findId(id: number){
    return this.findByCondition({ id });
  }

  findEmail(email: string){
    return this.findByCondition({ email });
  }

  findUser(email: string, senha: string){
    return this.findByCondition({ email, senha });
  }

  findCpf(cpf: string){
    return this.findByCondition({ cpf });
  }

  findTelefone(telefone: string){
    return this.findByCondition({ telefone });
  }

  //Update geral(de qualquer informação)
  async update(id: number, UpdatePassageiroDto: UpdatePassageiroDto) {
    const todo = await this.passageiroRepository.findOne({ where: {  id } })
    Object.assign(todo, UpdatePassageiroDto);

    return await this.passageiroRepository.save(todo);
  }


  remove(id: number) {
    return this.passageiroRepository.delete(id);
  }
}
