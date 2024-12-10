import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PairsModule } from './pairs/pairs.module';
import { RatesModule } from './rates/rates.module';
import {ScheduleModule} from "@nestjs/schedule";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'db', // Используется DB_HOST
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'crypto_rates',
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
