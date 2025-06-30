-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_chat_messages ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- User profiles policies
CREATE POLICY "User profiles are viewable by everyone" ON public.user_profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = user_id);

-- Agents policies
CREATE POLICY "Agents are viewable by everyone" ON public.agents FOR SELECT USING (true);
CREATE POLICY "Users can insert their own agent profile" ON public.agents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own agent profile" ON public.agents FOR UPDATE USING (auth.uid() = user_id);

-- Properties policies
CREATE POLICY "Properties are viewable by everyone" ON public.properties FOR SELECT USING (status = 'active');
CREATE POLICY "Agents can insert their own properties" ON public.properties FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.agents WHERE agents.user_id = auth.uid() AND agents.id = agent_id)
);
CREATE POLICY "Agents can update their own properties" ON public.properties FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.agents WHERE agents.user_id = auth.uid() AND agents.id = agent_id)
);

-- Property images policies
CREATE POLICY "Property images are viewable by everyone" ON public.property_images FOR SELECT USING (true);
CREATE POLICY "Agents can manage their property images" ON public.property_images FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.properties p 
    JOIN public.agents a ON p.agent_id = a.id 
    WHERE p.id = property_id AND a.user_id = auth.uid()
  )
);

-- Favorites policies
CREATE POLICY "Users can view their own favorites" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own favorites" ON public.favorites FOR ALL USING (auth.uid() = user_id);

-- Messages policies
CREATE POLICY "Users can view their own messages" ON public.messages FOR SELECT USING (
  auth.uid() = sender_id OR auth.uid() = recipient_id
);
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can update their own messages" ON public.messages FOR UPDATE USING (auth.uid() = sender_id);

-- Contacts policies
CREATE POLICY "Users can view their own contacts" ON public.contacts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own contacts" ON public.contacts FOR ALL USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "Users can update their own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = reviewer_id);

-- Search history policies
CREATE POLICY "Users can view their own search history" ON public.search_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own search history" ON public.search_history FOR ALL USING (auth.uid() = user_id);

-- AI chat sessions policies
CREATE POLICY "Users can view their own chat sessions" ON public.ai_chat_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own chat sessions" ON public.ai_chat_sessions FOR ALL USING (auth.uid() = user_id);

-- AI chat messages policies
CREATE POLICY "Users can view messages from their sessions" ON public.ai_chat_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.ai_chat_sessions WHERE id = session_id AND user_id = auth.uid())
);
CREATE POLICY "Users can insert messages to their sessions" ON public.ai_chat_messages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.ai_chat_sessions WHERE id = session_id AND user_id = auth.uid())
);
