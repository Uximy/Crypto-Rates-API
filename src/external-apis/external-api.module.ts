import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CryptoApiService } from './crypto-api.service';

@Module({
    imports: [HttpModule],
    providers: [CryptoApiService],
    exports: [CryptoApiService],
})
export class ExternalApiModule {}
