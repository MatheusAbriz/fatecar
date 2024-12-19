/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CorridaService } from './corrida.service';
import { CorridaController } from './corrida.controller';
import { corridaProviders } from './corrida.providers';
import { DatabaseModule } from 'src/database/database.module';
import { passageiroProviders } from 'src/passageiro/passageiro.providers';
import { PassageiroService } from 'src/passageiro/passageiro.service';
import { motoristaProviders } from 'src/motorista/motorista.providers';
import { MotoristaService } from 'src/motorista/motorista.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CorridaController],
  providers: [...corridaProviders, CorridaService, ...passageiroProviders, PassageiroService, ...motoristaProviders, MotoristaService],
})
export class CorridaModule {}
