import {IsString, IsBoolean, IsNumber, IsOptional, Min} from 'class-validator';

export class UpdatePairDto {
    @IsString()
    @IsOptional()
    baseCurrency?: string;

    @IsString()
    @IsOptional()
    quoteCurrency?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsNumber()
    @IsOptional()
    @Min(1)
    updateInterval?: number;
}
