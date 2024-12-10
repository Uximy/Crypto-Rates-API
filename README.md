# Crypto Rates API

Этот проект предоставляет API для управления и получения курсов криптовалютных пар. Реализован с использованием NestJS, TypeORM и PostgreSQL. Также используется API Сoingecko для получения точный курсы валют

## Функционал
- Управление криптовалютными парами (создание, обновление, удаление, получение).
- Получение курсов с фильтрацией (по парам, диапазону дат, сортировке, лимиту записей).
- Периодическое обновление курсов через Cron-задачи.
- Валидация входящих данных и централизованная обработка ошибок.

---

## Требования
Для запуска проекта необходимо установить:
- [Node.js](https://nodejs.org/) (версия 16 или выше)
- [Docker](https://www.docker.com/) и [Docker Compose](https://docs.docker.com/compose/)

---

## Установка
1. **Клонируйте репозиторий:**
    ```bash
    git clone https://github.com/your-repository/crypto-rates-api.git
    cd crypto-rates-api
    ```
2. **Установите зависимости:**
    ```bash
    npm install
    ```
   
## Запуск
Запустите Docker Compose: ```docker-compose up --build```

## Использование API
 API-документация доступна через Swagger:
- Swagger UI: http://localhost:3000/api-docs


## Структура проекта

```
src/
├── pairs/             # Модуль для управления парами
│   ├── dto/           # DTO для создания и обновления
│   ├── entities/      # Сущности базы данных
│   ├── pairs.module.ts
│   ├── pairs.service.ts
│   ├── pairs.controller.ts
├── rates/             # Модуль для работы с курсами
│   ├── rates.module.ts
│   ├── rates.service.ts
│   ├── rates.controller.ts
├── main.ts            # Точка входа приложения
```

## Логирование

- Проект использует встроенный Logger NestJS для записи операций. Логи ошибок и отладочные сообщения можно видеть в консоли.
