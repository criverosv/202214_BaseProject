import { IsNotEmpty, IsString } from 'class-validator';

export class SocioDto {

    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly birthDate: string;

}