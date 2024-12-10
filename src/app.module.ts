import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PairsModule } from './pairs/pairs.module';
import { RatesModule } from './rates/rates.module';
import {ScheduleModule} from "@nestjs/schedule";
import * as process from "node:process";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host:  process.env.DB_HOST || 'db', // Используется DB_HOST
            port:  Number(process.env.DB_PORT) || 5432,
            username: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_NAME || 'crypto_rates',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true, // Используйте false в продакшене
            retryAttempts: 10,
            retryDelay: 3000,
        }),
        PairsModule,
        RatesModule,
    ],
    controllers: [],
    providers: [],
})

export class AppModule {}
