-- This script clears all properties and seeds new ones with images
-- Ensure you have a valid user ID - replace 'YOUR_USER_ID_HERE' with an actual auth.users.id

-- Get the first user from auth.users for testing (modify as needed)
DO $$
DECLARE
  user_id UUID;
BEGIN
  -- Get the first user or insert test data
  SELECT id INTO user_id FROM auth.users LIMIT 1;
  
  -- If no user exists, you'll need to create one manually via Supabase Auth
  -- For now, we'll create properties for the authenticated user
  
  IF user_id IS NOT NULL THEN
    -- Clear existing properties for this user
    DELETE FROM property_features WHERE property_id IN (
      SELECT id FROM properties WHERE user_id = user_id
    );
    DELETE FROM properties WHERE user_id = user_id;

    -- Insert new properties with high-quality data
    INSERT INTO properties (
      user_id, title, description, property_type, listing_type, price, 
      bedrooms, bathrooms, area, address, city, state, created_at, updated_at
    ) VALUES
    (
      user_id,
      'Luxurious Modern Villa with Ocean View',
      'This stunning 5-bedroom villa features floor-to-ceiling windows overlooking the Atlantic Ocean. Located in the exclusive Ikoyi neighborhood, this property boasts smart home technology, a heated infinity pool, and a world-class gym facility. The open-plan living area flows seamlessly onto a marble terrace perfect for entertaining. Each bedroom is en-suite with premium fixtures. The property comes with a state-of-the-art kitchen, home theater, and underground parking for 4 vehicles.',
      'Villa',
      'sale',
      850000000,
      5,
      5,
      750,
      '15 Ikoyi Lane',
      'Lagos',
      'Lagos State',
      NOW(),
      NOW()
    ),
    (
      user_id,
      'Contemporary 3-Bedroom Apartment in Lekki',
      'Modern apartment in prime Lekki location with excellent road network. Features spacious living areas, equipped kitchen, and panoramic city views from the balcony. The building offers 24/7 security, CCTV surveillance, backup power generator, and a residents'' gym. Walking distance to shopping malls, restaurants, and international schools. Perfect for young professionals or small families.',
      'Apartment',
      'sale',
      120000000,
      3,
      3,
      200,
      '45 Admiralty Way',
      'Lagos',
      'Lagos State',
      NOW(),
      NOW()
    ),
    (
      user_id,
      'Executive Penthouse with Smart Home Features',
      'Stunning penthouse in the heart of Victoria Island featuring cutting-edge smart home automation. The property includes a private rooftop garden, a temperature-controlled wine cellar, and a dedicated home office. The master suite spans an entire wing with a spa bathroom and walk-in closet. Floor-to-ceiling windows provide panoramic city views. Premium finishes throughout with Italian marble and imported timber flooring.',
      'Apartment',
      'sale',
      650000000,
      4,
      4,
      500,
      '23 Agungi Street',
      'Lagos',
      'Lagos State',
      NOW(),
      NOW()
    ),
    (
      user_id,
      'Spacious Family Home in Abuja FCT',
      'Well-maintained 4-bedroom duplex in a serene, gated community in Abuja. Features a large living room, dining area, modern kitchen, and multiple visitor lounges. Beautiful landscaped garden with both front and back yards. Double carport and additional parking space. The property is located in a secure estate with 24/7 security, central water system, and standby generator.',
      'House',
      'sale',
      95000000,
      4,
      3,
      400,
      '12 Gwarinpa Street',
      'Abuja',
      'FCT',
      NOW(),
      NOW()
    ),
    (
      user_id,
      'Luxury 2-Bedroom Serviced Apartment - Short Term Rental',
      'Premium serviced apartment perfect for expatriates and business travelers. Includes housekeeping services, WiFi, cable TV, and fully equipped kitchen. Located in a secure complex with gym, pool, and 24-hour security. Weekly and monthly rental options available. Flexible lease terms. All utilities included in the rental price.',
      'Apartment',
      'rent',
      500000,
      2,
      2,
      150,
      '78 Banana Island Road',
      'Lagos',
      'Lagos State',
      NOW(),
      NOW()
    ),
    (
      user_id,
      'Commercial Office Space in Business District',
      'Prime office space in the heart of the business district with excellent visibility and accessibility. High ceiling, open-plan layout, and large windows. Includes dedicated parking, backup power, high-speed internet, and 24/7 security. Recently renovated with modern amenities. Suitable for corporate offices, co-working spaces, or professional services.',
      'Office',
      'rent',
      1500000,
      NULL,
      1,
      120,
      '88 Lekki-Epe Expressway',
      'Lagos',
      'Lagos State',
      NOW(),
      NOW()
    ),
    (
      user_id,
      'Beachfront Property with Development Potential',
      'Rare beachfront land offering tremendous development potential in a rapidly developing area. Approximately 2 acres of prime real estate with direct beach access. Infrastructure is in place including electricity and water connections. Perfect for resort development, residential complex, or commercial venture. Title documents clear and ready.',
      'Land',
      'sale',
      450000000,
      NULL,
      NULL,
      2000,
      'Badagry Peninsula',
      'Lagos',
      'Lagos State',
      NOW(),
      NOW()
    ),
    (
      user_id,
      'Charming Old Bungalow Needing Renovation',
      'Historic 3-bedroom bungalow with character and potential. Large compound, mature trees providing natural shade. The property needs renovation but has solid foundations and good bones. Located in a stable neighborhood with growing property values. Perfect opportunity for investors looking to renovate and flip.',
      'House',
      'sale',
      45000000,
      3,
      2,
      350,
      '56 Oshodi Road',
      'Lagos',
      'Lagos State',
      NOW(),
      NOW()
    );

    -- Add features to properties (associating features with each property)
    INSERT INTO property_features (property_id, feature) 
    SELECT id, feature FROM (
      SELECT (SELECT id FROM properties WHERE user_id = $1 AND title LIKE '%Villa%' LIMIT 1) as prop_id, 
             unnest(ARRAY['pool', 'garden', 'gym', 'security', 'ac', 'heating', 'furnished', 'balcony', 'parking', 'fireplace']) as feature
      UNION ALL
      SELECT (SELECT id FROM properties WHERE user_id = $1 AND title LIKE '%Ikoyi%' LIMIT 1) as prop_id,
             unnest(ARRAY['ac', 'parking', 'gym', 'security', 'balcony'])
      UNION ALL
      SELECT (SELECT id FROM properties WHERE user_id = $1 AND title LIKE '%Penthouse%' LIMIT 1) as prop_id,
             unnest(ARRAY['pool', 'garden', 'security', 'ac', 'heating', 'furnished', 'balcony', 'parking', 'gym', 'elevator'])
      UNION ALL
      SELECT (SELECT id FROM properties WHERE user_id = $1 AND title LIKE '%Abuja%' LIMIT 1) as prop_id,
             unnest(ARRAY['garden', 'garage', 'security', 'ac', 'heating', 'parking'])
      UNION ALL
      SELECT (SELECT id FROM properties WHERE user_id = $1 AND title LIKE '%Serviced%' LIMIT 1) as prop_id,
             unnest(ARRAY['furnished', 'ac', 'gym', 'parking'])
      UNION ALL
      SELECT (SELECT id FROM properties WHERE user_id = $1 AND title LIKE '%Office%' LIMIT 1) as prop_id,
             unnest(ARRAY['ac', 'parking', 'security'])
    ) features(prop_id, feature)
    WHERE prop_id IS NOT NULL
    ON CONFLICT (property_id, feature) DO NOTHING;

    RAISE NOTICE 'Successfully seeded % properties with features', 
      (SELECT COUNT(*) FROM properties WHERE user_id = $1);
  ELSE
    RAISE EXCEPTION 'No user found in auth.users table. Please create a user first via Supabase Auth.';
  END IF;
END $$;
