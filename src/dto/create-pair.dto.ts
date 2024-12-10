import {IsString, IsBoolean, IsNumber, Min} from 'class-validator';

export class CreatePairDto {
    @IsString()
    baseCurrency: string;

    @IsString()
    quoteCurrency: string;
    @IsBoolean()
    isActive: boolean;

    @IsNumber()
    @Min(1)
    updateInterval: number;
}
