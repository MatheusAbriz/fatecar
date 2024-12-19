/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MotoristaService } from './motorista.service';
import { MotoristaController } from './motorista.controller';
import { motoristaProviders } from './motorista.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MotoristaController],
  providers: [...motoristaProviders,MotoristaService],
})
export class MotoristaModule {}
