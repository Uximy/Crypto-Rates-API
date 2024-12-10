import { Module } from '@nestjs/common';
import { PairsService } from './pairs.service';
import { PairsController } from './pairs.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import { CryptoPair } from '../entities/crypto-pair.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CryptoPair])],
  controllers: [PairsController],
  providers: [PairsService],
  exports: [PairsService, TypeOrmModule]
})
export class PairsModule {}
