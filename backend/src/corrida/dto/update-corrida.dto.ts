/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateCorridaDto } from './create-corrida.dto';
import { IsString } from 'class-validator';

export class UpdateCorridaDto extends PartialType(CreateCorridaDto) {
    @IsString()
    nome: string;
}
