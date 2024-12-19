import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassageiroModule } from './passageiro/passageiro.module';
import { MotoristaModule } from './motorista/motorista.module';
import { CarroModule } from './carro/carro.module';
import { CorridaModule } from './corrida/corrida.module';

@Module({
  imports: [PassageiroModule, MotoristaModule, CarroModule, CorridaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
