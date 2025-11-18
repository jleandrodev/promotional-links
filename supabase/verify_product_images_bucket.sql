-- Script para verificar e criar o bucket product_images se necessário
-- Execute este SQL no Supabase SQL Editor ANTES de executar product_images_rls.sql

-- Verificar se o bucket existe
SELECT 
  name,
  id,
  public,
  file_size_limit,
  allowed_mime_types
FROM storage.buckets
WHERE name = 'product_images';

-- Se o bucket não existir, você precisa criá-lo manualmente:
-- 1. Vá em Storage → Buckets no Supabase Dashboard
-- 2. Clique em "New bucket"
-- 3. Nome: product_images
-- 4. Marque como "Public bucket"
-- 5. Clique em "Create bucket"

-- OU execute o comando abaixo (pode dar erro se já existir, mas é seguro):
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product_images',
  'product_images',
  true,
  5242880, -- 5MB em bytes
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Verificar novamente
SELECT 
  name,
  id,
  public,
  file_size_limit,
  allowed_mime_types
FROM storage.buckets
WHERE name = 'product_images';

