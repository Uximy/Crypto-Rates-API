import { Module } from '@nestjs/common';
import { RatesService } from './rates.service';
import { ExternalApiModule } from '../external-apis/external-api.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CryptoPair} from "../entities/crypto-pair.entity";
import {CryptoRate} from "../entities/crypto-rate.entity";
import {RatesController} from "./rates.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([CryptoPair, CryptoRate]),
        ExternalApiModule
    ],
    controllers: [RatesController],
    providers: [RatesService],
    exports: [RatesService],
})
export class RatesModule {}
