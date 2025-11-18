-- Políticas RLS para o bucket blogpost_images
-- Execute este SQL no Supabase SQL Editor

-- Permitir upload de arquivos para usuários autenticados
CREATE POLICY "Allow authenticated users to upload blogpost images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blogpost_images');

-- Permitir leitura pública dos arquivos
CREATE POLICY "Allow public read access to blogpost images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blogpost_images');

-- Permitir atualização para usuários autenticados
CREATE POLICY "Allow authenticated users to update blogpost images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'blogpost_images');

-- Permitir exclusão para usuários autenticados
CREATE POLICY "Allow authenticated users to delete blogpost images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'blogpost_images');

