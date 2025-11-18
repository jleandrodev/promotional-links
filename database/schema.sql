-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  is_pillar BOOLEAN DEFAULT FALSE,
  order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  author_id UUID,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  excerpt TEXT,
  image TEXT,
  price DECIMAL(10, 2),
  link TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Home content table
CREATE TABLE IF NOT EXISTS home_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hero_title VARCHAR(255),
  hero_subtitle TEXT,
  hero_image TEXT,
  banner_title VARCHAR(255),
  banner_subtitle TEXT,
  banner_image TEXT,
  banner_link TEXT,
  newsletter_title VARCHAR(255),
  newsletter_subtitle TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_product ON blog_posts(product_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_home_content_updated_at BEFORE UPDATE ON home_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default categories based on the requirements
INSERT INTO categories (name, slug, description, is_pillar, "order") VALUES
  ('Conditions', 'conditions', 'Health conditions and natural solutions', TRUE, 1),
  ('Natural Remedies', 'natural-remedies', 'Herbs, supplements, and natural remedies', TRUE, 2),
  ('Guides & Protocols', 'guides', 'Step-by-step guides and protocols', TRUE, 3),
  ('Product Reviews', 'reviews', 'Detailed product reviews and comparisons', TRUE, 4),
  ('Recipes & Lifestyle', 'recipes', 'Functional recipes and lifestyle tips', FALSE, 5),
  ('Science & Research', 'science', 'Scientific research and studies explained', FALSE, 6),
  ('For Women', 'women', 'Women''s health and wellness', FALSE, 7),
  ('For Men', 'men', 'Men''s health and wellness', FALSE, 8),
  ('Shop', 'shop', 'Product landing pages', FALSE, 9)
ON CONFLICT (slug) DO NOTHING;

