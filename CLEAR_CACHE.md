# Como limpar o cache do Next.js

## Passo a passo:

1. **Pare o servidor Next.js** (Ctrl+C)

2. **Delete a pasta .next**:
   ```bash
   # Windows (PowerShell)
   Remove-Item -Recurse -Force .next
   
   # Windows (CMD)
   rmdir /s /q .next
   
   # Linux/Mac
   rm -rf .next
   ```

3. **Opcional: Limpar cache do node_modules/.cache**:
   ```bash
   # Windows
   rmdir /s /q node_modules\.cache
   
   # Linux/Mac
   rm -rf node_modules/.cache
   ```

4. **Reinicie o servidor**:
   ```bash
   npm run dev
   ```

## Se ainda não funcionar:

1. Verifique se o Prisma Client foi gerado:
   ```bash
   npx prisma generate
   ```

2. Verifique se o banco está sincronizado:
   ```bash
   npx prisma db push
   ```

3. Reinicie o TypeScript Server no VS Code:
   - Ctrl+Shift+P
   - Digite: "TypeScript: Restart TS Server"

