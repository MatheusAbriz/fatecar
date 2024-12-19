import { DataSource } from 'typeorm';
import { Motorista } from './entities/motorista.entity';

export const motoristaProviders = [
    {
    provide: "MOTORISTA_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Motorista),
    inject: ['DATA_SOURCE'],
},
];