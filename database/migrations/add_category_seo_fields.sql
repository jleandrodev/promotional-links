-- Add SEO fields to categories table
ALTER TABLE categories 
ADD COLUMN IF NOT EXISTS seo_title VARCHAR(255),
ADD COLUMN IF NOT EXISTS seo_description TEXT;

-- Add index for SEO title if needed
CREATE INDEX IF NOT EXISTS idx_categories_seo_title ON categories(seo_title);

