-- Drop existing tables if they exist (for clean slate)
DROP POLICY IF EXISTS "Users can view all properties" ON properties;
DROP POLICY IF EXISTS "Users can create own properties" ON properties;
DROP POLICY IF EXISTS "Users can update own properties" ON properties;
DROP POLICY IF EXISTS "Users can delete own properties" ON properties;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS property_features;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS llm_configs;

-- Create Properties Table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  property_type TEXT NOT NULL CHECK (property_type IN ('Apartment', 'House', 'Villa', 'Townhouse', 'Land', 'Office', 'Shop', 'Warehouse', 'Other')),
  listing_type TEXT NOT NULL CHECK (listing_type IN ('sale', 'rent')),
  price NUMERIC NOT NULL CHECK (price > 0),
  bedrooms INTEGER CHECK (bedrooms >= 0),
  bathrooms INTEGER CHECK (bathrooms >= 0),
  area NUMERIC CHECK (area > 0),
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Property Features Table (normalized one-to-many relationship)
CREATE TABLE property_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  feature TEXT NOT NULL CHECK (feature IN ('pool', 'garden', 'garage', 'security', 'ac', 'heating', 'furnished', 'balcony', 'parking', 'gym', 'elevator', 'fireplace')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(property_id, feature)
);

-- Create Contacts Table
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT phone_not_empty CHECK (phone != '')
);

-- Create Messages Table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  message_text TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create LLM Configs Table
CREATE TABLE llm_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  model TEXT NOT NULL,
  api_key TEXT NOT NULL,
  temperature NUMERIC DEFAULT 0.7 CHECK (temperature >= 0 AND temperature <= 2),
  max_tokens INTEGER DEFAULT 2048 CHECK (max_tokens >= 1 AND max_tokens <= 8192),
  top_p NUMERIC DEFAULT 0.95 CHECK (top_p >= 0 AND top_p <= 1),
  frequency_penalty NUMERIC DEFAULT 0 CHECK (frequency_penalty >= 0 AND frequency_penalty <= 2),
  presence_penalty NUMERIC DEFAULT 0 CHECK (presence_penalty >= 0 AND presence_penalty <= 2),
  system_prompt TEXT,
  streaming BOOLEAN DEFAULT TRUE,
  cache BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE llm_configs ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for Properties
CREATE POLICY "Users can view all properties" ON properties FOR SELECT USING (true);
CREATE POLICY "Users can create own properties" ON properties FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own properties" ON properties FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own properties" ON properties FOR DELETE USING (auth.uid() = user_id);

-- Create RLS Policies for Property Features
CREATE POLICY "Users can view all features" ON property_features FOR SELECT USING (true);
CREATE POLICY "Users can add features to own properties" ON property_features FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM properties WHERE id = property_id AND user_id = auth.uid()));
CREATE POLICY "Users can delete features from own properties" ON property_features FOR DELETE
  USING (EXISTS (SELECT 1 FROM properties WHERE id = property_id AND user_id = auth.uid()));

-- Create RLS Policies for Contacts
CREATE POLICY "Users can view own contacts" ON contacts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own contacts" ON contacts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own contacts" ON contacts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own contacts" ON contacts FOR DELETE USING (auth.uid() = user_id);

-- Create RLS Policies for Messages
CREATE POLICY "Users can view messages where they are involved" ON messages FOR SELECT 
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can update own messages" ON messages FOR UPDATE USING (auth.uid() = sender_id);

-- Create RLS Policies for LLM Configs
CREATE POLICY "Users can view own config" ON llm_configs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own config" ON llm_configs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own config" ON llm_configs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own config" ON llm_configs FOR DELETE USING (auth.uid() = user_id);

-- Create Indexes for better query performance
CREATE INDEX idx_properties_user_id ON properties(user_id);
CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_properties_listing_type ON properties(listing_type);
CREATE INDEX idx_property_features_property_id ON property_features(property_id);
CREATE INDEX idx_contacts_user_id ON contacts(user_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX idx_messages_property_id ON messages(property_id);
CREATE INDEX idx_llm_configs_user_id ON llm_configs(user_id);
