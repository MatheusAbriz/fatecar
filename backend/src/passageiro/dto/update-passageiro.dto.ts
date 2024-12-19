/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreatePassageiroDto } from './create-passageiro.dto';
import { IsBoolean, IsString } from 'class-validator';

export class UpdatePassageiroDto extends PartialType(CreatePassageiroDto) {
    @IsString()
    nome: string;

    @IsString()
    email: string;

    @IsString()
    cpf: string;

    @IsString()
    telefone: string;

    @IsString()
    senha: string;

    @IsString()
    genero: string;

    @IsString()
    endereco: string;

    @IsString()
    estado: string;

    @IsString()
    cidade: string;

    @IsString()
    ra: string;

    @IsString()
    foto: string;

    @IsBoolean()
    statusCorrida: boolean;
}
