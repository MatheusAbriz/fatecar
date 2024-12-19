import { DataSource } from 'typeorm';
import { Passageiro } from './entities/passageiro.entity';

export const passageiroProviders = [
    {
    provide: "PASSAGEIRO_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Passageiro),
    inject: ['DATA_SOURCE'],
},
];