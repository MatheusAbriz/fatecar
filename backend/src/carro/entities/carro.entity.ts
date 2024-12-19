/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Motorista } from '../../motorista/entities/motorista.entity'

@Entity()
export class Carro {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ length: 100 })
    nome: string;

    @Column({ length: 100 })
    fotoCrlv: string;

    @Column({ length: 100 })
    fotoCnh: string;

    @Column({ length: 100 })
    modelo: string;

    @Column({ length: 100 })
    ano: string;

    @Column({ length: 100 })
    cor: string;

    //Criando a relação um para um
    //@OneToOne(() => Motorista, (motorista) => motorista.carro)
    //@JoinColumn()//FK apontando para 'Motorista'
    //motorista: Motorista;

    @OneToOne(type => Motorista, carro => Carro, { eager: true }) //Usar o eager, ele que possibilita esse envio do idMotorista
    @JoinColumn()
    motorista: Motorista;
}
