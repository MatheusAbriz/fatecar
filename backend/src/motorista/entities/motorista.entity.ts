/* eslint-disable prettier/prettier */
import { Carro } from 'src/carro/entities/carro.entity';
import { Corrida } from 'src/corrida/entities/corrida.entity';
import { Passageiro } from 'src/passageiro/entities/passageiro.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Motorista {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nome: string;

    @Column({ length: 255, unique: true })
    email: string;

    @Column({ length: 100, unique: true })
    cpf: string;

    @Column({ length: 100, unique: true })
    telefone: string;

    @Column({ length: 100 })
    senha: string;

    @Column({ length: 1 })
    genero: string;

    @Column({ length: 100 })
    endereco: string;

    @Column({ length: 100 })
    estado: string;

    @Column({ length: 100 })
    cidade: string;

    @Column({ length: 100, nullable: true, unique: true })
    ra: string;

    @Column({ length: 255, nullable: true })
    foto: string

    @Column({ default: false })
    statusCorrida: boolean;

    //Criando a relação um para um
    //@OneToOne(() => Carro, (carro) => carro.motorista)
    //@JoinColumn() FK apontando para 'Carro'
    //carro: Carro;
      
    //Criando a relação com a tabela corrida(um motorista para varias corridas)
    //@OneToMany(type => Corrida, motorista => Motorista)
    //corridas: Corrida;

    @ManyToMany(() => Passageiro)
    @JoinTable({name: "corridaPassageiroMotorista"})
    passageiros: Passageiro[]

    @OneToMany(() => Corrida, (corrida) => corrida.motorista)
    corridas: Corrida[];
    
    @OneToOne(type => Carro, motorista => Motorista)
    @JoinColumn()
    carro: Carro;
  length: number;
}
