/* eslint-disable prettier/prettier */
import { Corrida } from 'src/corrida/entities/corrida.entity';
import { Motorista } from 'src/motorista/entities/motorista.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Passageiro{
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
    statusCorrida: boolean

    //Muitos passageiros para uma corrida(talvez seja muitos passageiros para muitas corridas, ou muitos passageiros para uma corrida)
    //@OneToMany(type => Corrida, passageiro => Passageiro)
    //Declarando um array pois são muitas corridas
    //corridas: Corrida[];
    
    

    //@OneToMany(() => Corrida, (corrida) => corrida.passageiros)
    //corrida: Corrida;

    @ManyToMany(() => Corrida, (corrida) => corrida.passageiros)
    corridas: Corrida[]
}
