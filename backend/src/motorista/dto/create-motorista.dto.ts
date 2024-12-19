/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { IsBoolean, IsString, IsInt } from 'class-validator';

export class CreateMotoristaDto {
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
    saldoConta: string;

    @IsInt()
    carroId: number;

    @IsBoolean()
    statusCorrida: boolean;

}
