-- Migration: Add excerpt to products and promoted_product_link to blog_posts
-- Run this in your Supabase SQL Editor

-- Add excerpt column to products table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'excerpt'
  ) THEN
    ALTER TABLE products ADD COLUMN excerpt TEXT;
  END IF;
END $$;

-- Add promoted_product_link column to blog_posts table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blog_posts' AND column_name = 'promoted_product_link'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN promoted_product_link TEXT;
  END IF;
END $$;

