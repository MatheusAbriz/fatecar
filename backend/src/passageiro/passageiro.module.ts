/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PassageiroController } from './passageiro.controller';
import { passageiroProviders } from './passageiro.providers';
import { PassageiroService } from './passageiro.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PassageiroController],
  providers: [...passageiroProviders,PassageiroService],
})
export class PassageiroModule {}
