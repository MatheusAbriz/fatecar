/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CarroService } from './carro.service';
import { CarroController } from './carro.controller';
import { carroProviders } from './carro.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CarroController],
  providers: [...carroProviders, CarroService],
})
export class CarroModule {}
