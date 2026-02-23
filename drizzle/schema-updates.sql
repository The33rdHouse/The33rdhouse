-- Add subscription fields to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'free';
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'active';
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_ends_at TIMESTAMP;

-- Create products table for digital products
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  product_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  stripe_price_id TEXT,
  download_url TEXT,
  cover_image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_purchases table to track one-time product purchases
CREATE TABLE IF NOT EXISTS user_purchases (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  stripe_payment_intent_id TEXT,
  amount INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  download_count INTEGER DEFAULT 0,
  last_downloaded_at TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer ON users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_users_subscription_tier ON users(subscription_tier);
CREATE INDEX IF NOT EXISTS idx_user_purchases_user_id ON user_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_user_purchases_product_id ON user_purchases(product_id);
