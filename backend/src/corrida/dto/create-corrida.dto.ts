/* eslint-disable prettier/prettier */
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateCorridaDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    passageirosIds: number[];

    @IsNotEmpty()
    @IsNumber()
    motoristaId: number;
    
    @IsString()
    nome: string;

    
    @IsString()
    tempoCorrida: string;

    @IsString()
    distanciaCorrida: string;

    @IsString()
    precoCorrida: string;
}
