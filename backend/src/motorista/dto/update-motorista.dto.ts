/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateMotoristaDto } from './create-motorista.dto';
import { IsString, IsInt, IsBoolean } from 'class-validator';

export class UpdateMotoristaDto extends PartialType(CreateMotoristaDto) {
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

    @IsString()
    saldoConta: string;

    @IsInt()
    carroId: number;

    @IsBoolean()
    statusCorrida: boolean
}
