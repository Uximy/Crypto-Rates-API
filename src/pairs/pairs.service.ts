import {Injectable, NotFoundException, Logger} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CryptoPair } from '../entities/crypto-pair.entity';
import {UpdatePairDto} from "../dto/update-pair.dto";
import {CreatePairDto} from "../dto/create-pair.dto";

@Injectable()
export class PairsService {
    private readonly logger = new Logger(PairsService.name)
    constructor(
        @InjectRepository(CryptoPair)
        private readonly pairsRepository: Repository<CryptoPair>,
    ) {}

    findAll() {
        this.logger.log(`Было получено все пары`);
        return this.pairsRepository.find();
    }

    findOne(id: number) {
        this.logger.log(`Было получено пара с id: ${id}`);
        return this.pairsRepository.findOne({ where: { id } });
    }

    create(createPairDto: CreatePairDto): Promise<CryptoPair> {
        const pair = this.pairsRepository.create(createPairDto);
        this.logger.log(`Создание новой пары: ${JSON.stringify(pair)}`);
        return this.pairsRepository.save(pair);
    }

    async update(id: number, updatePairDto: UpdatePairDto): Promise<CryptoPair> {
        const pair = await this.pairsRepository.findOne({ where: { id } });

        if (!pair) {
            this.logger.log(`Пара с ID ${id} не найдена`);
            throw new NotFoundException(`Пара с ID ${id} не найдена`);
        }

        Object.assign(pair, updatePairDto);
        this.logger.log(`Обновление новой пары: ${JSON.stringify(pair)}`);
        return this.pairsRepository.save(pair);
    }

    delete(id: number) {
        this.logger.log(`Была удалена пара id: ${id}`);
        return this.pairsRepository.delete(id);
    }
}
