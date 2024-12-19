/* eslint-disable prettier/prettier */
import { IsString, IsInt } from 'class-validator'
export class CreateCarroDto {
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
