/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateCarroDto } from './create-carro.dto';
import { IsString, IsInt } from 'class-validator';

export class UpdateCarroDto extends PartialType(CreateCarroDto) {
    @IsString()
    nome: string;

    @IsString()
    fotoCrlv: string;
    
    @IsString()
    fotoCnh: string;

    @IsString()
    modelo: string;

    @IsString()
    ano: string;

    @IsString()
    cor: string;

    @IsInt()
    motoristaId: number;
}
