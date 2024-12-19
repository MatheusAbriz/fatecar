/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { Carro } from './entities/carro.entity';

export const carroProviders = [
    {
    provide: "CARRO_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Carro),
    inject: ['DATA_SOURCE'],
},
];