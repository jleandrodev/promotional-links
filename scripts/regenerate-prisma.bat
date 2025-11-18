@echo off
echo Regenerando Prisma Client...
npx prisma generate
echo.
echo Limpando cache do Next.js...
if exist .next rmdir /s /q .next
echo.
echo Prisma Client regenerado com sucesso!
echo Reinicie o servidor Next.js com: npm run dev
pause

