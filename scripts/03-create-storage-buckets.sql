-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('property-images', 'property-images', true),
  ('profile-images', 'profile-images', true),
  ('property-documents', 'property-documents', false);

-- Create storage policies
CREATE POLICY "Property images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'property-images');
CREATE POLICY "Authenticated users can upload property images" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'property-images' AND auth.role() = 'authenticated'
);
CREATE POLICY "Users can update their own property images" ON storage.objects FOR UPDATE USING (
  bucket_id = 'property-images' AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Profile images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'profile-images');
CREATE POLICY "Users can upload their own profile images" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can update their own profile images" ON storage.objects FOR UPDATE USING (
  bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Property documents are accessible to property owners" ON storage.objects FOR SELECT USING (
  bucket_id = 'property-documents' AND auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can upload property documents" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'property-documents' AND auth.uid()::text = (storage.foldername(name))[1]
);
