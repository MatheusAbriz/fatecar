/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { Corrida } from './entities/corrida.entity';

export const corridaProviders = [
    {
    provide: "CORRIDA_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Corrida),
    inject: ['DATA_SOURCE'],
},
];