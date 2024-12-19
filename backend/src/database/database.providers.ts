/* eslint-disable prettier/prettier */
import { DataSource } from "typeorm";

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () =>{
            const dataSource = new DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '0505823513',
                database: 'teste2',
                entities: [__dirname + '/../**/*.entity{.ts,.js}',],
                synchronize: true,
            });
            return dataSource.initialize();
        },
    },
];