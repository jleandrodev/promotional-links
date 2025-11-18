-- Políticas RLS para o bucket product_images
-- Execute este SQL no Supabase SQL Editor

-- IMPORTANTE: Certifique-se de que o bucket 'product_images' existe e está configurado como público
-- Storage → Buckets → Verificar se 'product_images' existe

-- Remover políticas antigas se existirem (para evitar conflitos)
DROP POLICY IF EXISTS "Allow authenticated users to upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete product images" ON storage.objects;

-- Habilitar RLS no bucket (se ainda não estiver habilitado)
-- Nota: Isso deve ser feito manualmente no Dashboard se necessário
-- Storage → Buckets → product_images → Settings → Enable RLS

-- Permitir upload de arquivos para usuários autenticados
CREATE POLICY "Allow authenticated users to upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product_images');

-- Permitir leitura pública dos arquivos
CREATE POLICY "Allow public read access to product images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product_images');

-- Permitir atualização para usuários autenticados
CREATE POLICY "Allow authenticated users to update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product_images');

-- Permitir exclusão para usuários autenticados
CREATE POLICY "Allow authenticated users to delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product_images');

