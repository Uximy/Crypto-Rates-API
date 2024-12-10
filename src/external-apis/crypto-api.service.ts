import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CryptoApiService {
    constructor(private readonly httpService: HttpService) {}

    async getCryptoRates(pair: string): Promise<any> {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${pair}&vs_currencies=usd`;
        const response = await this.httpService.axiosRef.get(url);
        return response.data;
    }
}
