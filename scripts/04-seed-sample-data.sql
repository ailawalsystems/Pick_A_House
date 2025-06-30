-- Insert sample users (these would normally be created through Supabase Auth)
-- Note: In production, users are created through the auth system

-- Insert sample agents
INSERT INTO public.agents (id, user_id, company_name, license_number, specializations, experience_years, rating, total_reviews, total_properties, is_featured, languages, certifications, about) VALUES
  (uuid_generate_v4(), uuid_generate_v4(), 'Premium Realty', 'LIC001', ARRAY['Luxury Homes', 'Commercial Properties'], 10, 4.8, 24, 15, true, ARRAY['English', 'Hausa'], ARRAY['Licensed Real Estate Broker', 'Certified Property Manager'], 'With over 10 years of experience in the Abuja real estate market, I specialize in luxury properties and commercial real estate.'),
  (uuid_generate_v4(), uuid_generate_v4(), 'City Properties', 'LIC002', ARRAY['Residential', 'New Developments'], 7, 4.9, 32, 21, false, ARRAY['English', 'Yoruba'], ARRAY['Certified Residential Specialist'], 'I am passionate about helping families find their dream homes.'),
  (uuid_generate_v4(), uuid_generate_v4(), 'Business Real Estate', 'LIC003', ARRAY['Commercial', 'Office Spaces', 'Retail'], 8, 4.7, 18, 12, true, ARRAY['English'], ARRAY['Commercial Investment Member', 'Business Property Expert'], 'I specialize in commercial real estate, helping businesses find the perfect location.');

-- Insert sample properties
INSERT INTO public.properties (agent_id, title, description, property_type, listing_type, price, bedrooms, bathrooms, area_sqm, address, city, state, features, amenities, is_featured) 
SELECT 
  a.id,
  'Luxury Villa with Swimming Pool',
  'This stunning villa features a spacious living area, modern kitchen, and a private swimming pool.',
  'villa',
  'sale',
  250000000,
  5,
  4,
  350,
  '123 Luxury Lane',
  'Abuja',
  'FCT',
  ARRAY['Swimming Pool', 'Garden', 'Security System'],
  ARRAY['Air Conditioning', 'Parking Space', 'Furnished'],
  true
FROM public.agents a LIMIT 1;

-- Add more sample properties
INSERT INTO public.properties (agent_id, title, description, property_type, listing_type, price, bedrooms, bathrooms, area_sqm, address, city, state, features, amenities) 
SELECT 
  a.id,
  'Modern Apartment with Garden View',
  'Beautiful apartment with modern amenities and stunning garden view.',
  'apartment',
  'sale',
  120000000,
  3,
  2,
  150,
  '456 Garden Street',
  'Abuja',
  'FCT',
  ARRAY['Garden View', 'Modern Kitchen'],
  ARRAY['Air Conditioning', 'Parking Space']
FROM public.agents a OFFSET 1 LIMIT 1;
