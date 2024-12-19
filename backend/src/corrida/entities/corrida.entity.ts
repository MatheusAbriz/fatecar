/* eslint-disable prettier/prettier */
import { Motorista } from "src/motorista/entities/motorista.entity";
import { Passageiro } from "src/passageiro/entities/passageiro.entity";
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany, ManyToMany, JoinTable, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Corrida {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, default: ''})
    tempoCorrida: string;

    @Column({ length: 100, default: '' })
    distanciaCorrida: string;

    @Column({ length: 100, default: '' })
    precoCorrida: string;

    @ManyToMany(() => Passageiro, (passageiro) => passageiro.corridas, { eager: true, cascade: true })
    @JoinTable()
    passageiros: Passageiro[];

    @ManyToOne(() => Motorista, (motorista) => motorista.corridas)
    motorista: Motorista;
}
