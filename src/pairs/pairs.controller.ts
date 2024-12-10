import {Controller, Get, Post, Put, Delete, Param, Body, BadRequestException, NotFoundException} from '@nestjs/common';
import { PairsService } from './pairs.service';
import {ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody} from '@nestjs/swagger';
import {UpdatePairDto} from "../dto/update-pair.dto";
import {CreatePairDto} from "../dto/create-pair.dto";

@ApiTags('Pairs')
@Controller('pairs')
export class PairsController {
    constructor(private readonly pairsService: PairsService) {}

    @ApiOperation({ summary: 'Получить список всех пар' })
    @ApiResponse({ status: 200, description: 'Успешно получили список пар.' })
    @Get()
    findAll() {
        return this.pairsService.findAll();
    }

    @ApiOperation({ summary: 'Получить одну пару по ID' })
    @ApiResponse({ status: 200, description: 'Пара успешно найдена.' })
    @ApiResponse({ status: 404, description: 'Пара с указанным ID не найдена.' })
    @ApiParam({ name: 'id', description: 'ID пары', type: 'number' })
    @Get(':id')
    async findOne(@Param('id') id: number) {
        const pair = await this.pairsService.findOne(id);
        if (!pair) {
            throw new NotFoundException(`Пара с ID ${id} не найдена`);
        }
        return pair;

    }

    @ApiOperation({ summary: 'Создать новую пару' })
    @ApiResponse({ status: 201, description: 'Пара успешно создана.' })
    @ApiResponse({ status: 400, description: 'Ошибка в данных запроса.' })
    @ApiBody({
        description: 'Данные для создания пары',
        schema: {
            example: {
                baseCurrency: 'BTC',
                quoteCurrency: 'USDT',
                isActive: true,
                updateInterval: 5,
            },
        },
    })
    @Post()
    create(@Body() createPairDto: CreatePairDto) {
        return this.pairsService.create(createPairDto);
    }

    @ApiOperation({ summary: 'Обновить параметры пары' })
    @ApiResponse({ status: 200, description: 'Пара успешно обновлена.' })
    @ApiResponse({ status: 404, description: 'Пара не найдена.' })
    @ApiParam({ name: 'id', description: 'ID пары', type: 'number' })
    @ApiBody({
        description: 'Данные для обновление пары',
        schema: {
            example: {
                baseCurrency: "ETH",
                quoteCurrency: "USDT",
                isActive: false,
                updateInterval: 10
            }
        },
    })
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updatePairDto: UpdatePairDto,
    ) {
        const updatePair = this.pairsService.update(id, updatePairDto)

        if (!updatePair) {
            throw new NotFoundException(`Пара с ID ${id} не найдена для обновления`);
        }

        return updatePair;
    }

    @ApiOperation({ summary: 'Удалить пару по ID' })
    @ApiResponse({ status: 200, description: 'Пара успешно удалена.' })
    @ApiResponse({ status: 404, description: 'Пара не найдена.' })
    @ApiParam({ name: 'id', description: 'ID пары', type: 'number' })
    @Delete(':id')
    delete(@Param('id') id: number) {
        const deletePair = this.pairsService.delete(+id);

        if (!deletePair) {
            throw new NotFoundException(`Пара с ID ${id} не найдена, удалить не возможно`);
        }

        return deletePair;
    }
}
