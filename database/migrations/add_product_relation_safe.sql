-- Migration: Replace promoted_product_link with product_id relation (SAFE VERSION)
-- This version preserves existing data by creating a backup table
-- Run this in your Supabase SQL Editor

-- Step 1: Create backup table for existing promoted_product_link data
CREATE TABLE IF NOT EXISTS blog_posts_promoted_links_backup AS
SELECT 
  id,
  promoted_product_link,
  created_at
FROM blog_posts
WHERE promoted_product_link IS NOT NULL AND promoted_product_link != '';

-- Step 2: Check the actual type of products.id and add product_id with matching type
DO $$ 
DECLARE
  product_id_type TEXT;
BEGIN
  -- Get the data type of products.id
  SELECT data_type INTO product_id_type
  FROM information_schema.columns
  WHERE table_name = 'products' AND column_name = 'id';
  
  -- Add product_id column with the same type as products.id
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blog_posts' AND column_name = 'product_id'
  ) THEN
    IF product_id_type = 'uuid' THEN
      ALTER TABLE blog_posts ADD COLUMN product_id UUID;
    ELSIF product_id_type = 'text' OR product_id_type = 'character varying' THEN
      ALTER TABLE blog_posts ADD COLUMN product_id TEXT;
    ELSE
      ALTER TABLE blog_posts ADD COLUMN product_id TEXT;
    END IF;
    
    -- Add foreign key constraint
    ALTER TABLE blog_posts 
    ADD CONSTRAINT blog_posts_product_id_fkey 
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL;
    
    -- Create index
    CREATE INDEX IF NOT EXISTS idx_blog_posts_product ON blog_posts(product_id);
  END IF;
END $$;

-- Step 3: Remove promoted_product_link column if it exists
-- NOTE: This is the destructive operation. The data is already backed up above.
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blog_posts' AND column_name = 'promoted_product_link'
  ) THEN
    ALTER TABLE blog_posts DROP COLUMN promoted_product_link;
  END IF;
END $$;

-- Step 4: Optional - Drop backup table after verifying migration (uncomment when ready)
-- DROP TABLE IF EXISTS blog_posts_promoted_links_backup;

