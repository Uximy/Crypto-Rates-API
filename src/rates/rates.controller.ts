import { Controller, Get, Query } from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery} from '@nestjs/swagger';
import {RatesService} from "./rates.service";

@ApiTags('Rates') // Указывает, что эти эндпоинты относятся к категории "Rates"
@Controller('rates')
export class RatesController {
    constructor(private readonly ratesService: RatesService) {}

    @ApiOperation({ summary: 'Получение курсов с фильтрацией' }) // Описание эндпоинта
    @ApiQuery({ name: 'baseCurrency', required: false, description: 'Базовая валюта (например, bitcoin)' })
    @ApiQuery({ name: 'quoteCurrency', required: false, description: 'Котируемая валюта (например, USD)' })
    @ApiQuery({ name: 'startDate', required: false, description: 'Начало диапазона дат (ISO 8601)' })
    @ApiQuery({ name: 'endDate', required: false, description: 'Конец диапазона дат (ISO 8601)' })
    @ApiQuery({ name: 'limit', required: false, description: 'Лимит записей', type: 'number' })
    @ApiQuery({ name: 'sortBy', required: false, description: 'Поле для сортировки (rate или timestamp)' })
    @ApiQuery({ name: 'order', required: false, description: 'Порядок сортировки (ASC или DESC)' })
    @ApiResponse({ status: 200, description: 'Список курсов успешно получен.' })
    @Get()
    async findRatesFilter(
        @Query('baseCurrency') baseCurrency?: string,
        @Query('quoteCurrency') quoteCurrency?: string,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('limit') limit?: number,
        @Query('sortBy') sortBy?: 'rate' | 'timestamp',
        @Query('order') order?: 'ASC' | 'DESC',
    ){
        const filters = {
            baseCurrency,
            quoteCurrency,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
            limit,
            sortBy,
            order,
        };
        return this.ratesService.findRatesFilter(filters);
    }
}
