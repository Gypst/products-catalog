Простой проект e-commerce, содержащий frontend и backend.

## Технологии
- **Backend**: NestJS, Prisma (ORM)
- **Frontend**: React, TypeScript, Tailwind CSS
- **Database**: SQLite
- **File storage**: Локальное хранилище

## Установка

Клонировать репозиторий

### Backend
- ```cd backend```
- ```npm install```
- Создать файл .env c содержимым ```DATABASE_URL="file:./dev.db"```
- ```npx prisma migrate dev```
- Создать папку "uploads" в корне backend (на одном уровне с src)
- ```npm start dev``` для запуска Backend части.

### Frontend
- ```cd frontend```
- ```npm install```
- ```npm run dev```
- Перейти по ссылке ```http://localhost:5173/``` в браузере

