import {Injectable, Logger} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CryptoApiService } from '../external-apis/crypto-api.service';
import { CryptoPair } from '../entities/crypto-pair.entity';
import { CryptoRate } from '../entities/crypto-rate.entity';
import {Cron} from "@nestjs/schedule";

@Injectable()
export class RatesService {
    private readonly logger = new Logger(RatesService.name)
    constructor(
        private readonly cryptoApiService: CryptoApiService,
        @InjectRepository(CryptoPair)
        private readonly cryptoPairRepository: Repository<CryptoPair>,
        @InjectRepository(CryptoRate)
        private readonly cryptoRateRepository: Repository<CryptoRate>,
    ) {}

    @Cron('*/5 * * * *')
    async updateRates() {
        const pairs = await this.cryptoPairRepository.find({ where: { isActive: true } });

        for (const pair of pairs) {
            try {
                const rateData = await this.cryptoApiService.getCryptoRates(pair.baseCurrency);
                const rate = rateData[pair.baseCurrency.toLowerCase()]['usd'];

                const newRate = this.cryptoRateRepository.create({
                    pair,
                    rate,
                    timestamp: new Date(),
                });
                await this.cryptoRateRepository.save(newRate);

               this.logger.log(`Курс для пары ${pair.baseCurrency}/${pair.quoteCurrency} обновлён: ${rate}`)
            } catch (error) {
                this.logger.error(`Ошибка обновления курса для пары ${pair.baseCurrency}/${pair.quoteCurrency}:`, error.message)
            }
        }
    }

    async findRatesFilter(filters: {
        baseCurrency?: string;
        quoteCurrency?: string;
        startDate?: Date;
        endDate?: Date;
        limit?: number;
        sortBy?: 'rate' | 'timestamp';
        order?: 'ASC' | 'DESC';
    }) {
        const query = this.cryptoRateRepository.createQueryBuilder('rate')
            .leftJoinAndSelect('rate.pair', 'pair');

        if (filters.baseCurrency) {
            query.andWhere('pair.baseCurrency = :baseCurrency', { baseCurrency: filters.baseCurrency });
        }

        if (filters.quoteCurrency) {
            query.andWhere('pair.quoteCurrency = :quoteCurrency', { quoteCurrency: filters.quoteCurrency });
        }

        if (filters.startDate) {
            query.andWhere('rate.timestamp >= :startDate', { startDate: filters.startDate });
        }

        if (filters.endDate) {
            query.andWhere('rate.timestamp <= :endDate', { endDate: filters.endDate });
        }

        if (filters.sortBy) {
            query.orderBy(`rate.${filters.sortBy}`, filters.order || 'ASC');
        }

        if (filters.limit) {
            query.limit(filters.limit);
        }

        return query.getMany();
    }
}