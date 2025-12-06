# Pick Your House FCT - NLP Framework & Agentic System Specifications

## Executive Summary
A comprehensive system-wide NLP (Natural Language Processing) framework integrated with agentic AI capabilities to enable intelligent property recommendations, conversational interfaces, and autonomous task execution.

## 1. System Architecture Overview

### 1.1 Core Components
\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                 Frontend Layer (React)                      │
│  - AI Search Interface                                      │
│  - Chat Messenger                                           │
│  - Voice Commands (Future)                                  │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│              API Gateway & Authentication                   │
│  - Request Routing                                          │
│  - JWT Validation                                           │
│  - Rate Limiting                                            │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│           NLP Processing Pipeline                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 1. Text Preprocessing & Tokenization               │   │
│  │ 2. Intent Detection & Entity Recognition           │   │
│  │ 3. Semantic Analysis & Vector Embeddings           │   │
│  │ 4. Context Management & Memory Retrieval           │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│         Agentic AI Orchestration Engine                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Multi-Agent System (CrewAI)                         │   │
│  │  • Property Recommender Agent                       │   │
│  │  • Market Analyzer Agent                            │   │
│  │  • Price Estimator Agent                            │   │
│  │  • Document Parser Agent                            │   │
│  │  • Loan Calculator Agent                            │   │
│  │  • Chat Assistant Agent                             │   │
│  │  • Search Optimizer Agent (New)                     │   │
│  │  • Report Generator Agent (New)                     │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│        Tool Execution & Integration Layer                   │
│  - Database Query Execution                                 │
│  - External API Calls                                       │
│  - Real-time Data Processing                                │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│     Data Layer (Supabase + Vector Store)                    │
│  - Properties DB                                            │
│  - User Preferences                                         │
│  - Conversation History                                     │
│  - Vector Embeddings                                        │
│  - LLM Configurations                                       │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## 2. NLP Framework Details

### 2.1 Text Preprocessing Pipeline
- **Tokenization**: Split text into meaningful tokens
- **Normalization**: Lowercase, remove special characters, handle contractions
- **Stemming/Lemmatization**: Reduce words to root forms
- **Stop Word Removal**: Filter common words for faster processing
- **Language Detection**: Identify language for multi-language support

### 2.2 Intent Detection Module
Recognizes user intentions from natural language:
- `search_properties`: "Find me 3-bedroom apartments in Lekki"
- `price_inquiry`: "What's the average price for villas in FCT?"
- `market_analysis`: "Show me market trends for commercial spaces"
- `loan_inquiry`: "Calculate mortgage for a 100M property"
- `schedule_tour`: "I want to visit the property tomorrow at 2pm"
- `get_recommendation`: "Recommend properties based on my budget"
- `document_request`: "Send me the property documents"
- `complaint`: "I had a bad experience with..."
- `general_help`: "How does the platform work?"

### 2.3 Entity Recognition System
Extracts key information:
- **Location Entities**: Cities, districts, regions, landmarks
- **Property Entities**: Type, bedrooms, bathrooms, area, price
- **Time Entities**: Dates, times, relative time references
- **Person Entities**: Names, contact information, agent references
- **Quantity Entities**: Prices, measurements, counts, percentages

### 2.4 Semantic Analysis Engine
- **Vector Embeddings**: Convert text to 768-dimensional vectors using OpenAI embeddings
- **Similarity Matching**: Find semantically similar properties and queries
- **Context Preservation**: Maintain conversation context across turns
- **Semantic Relationships**: Understand property relationships and associations

## 3. Agentic AI System Specifications

### 3.1 Agent Architecture
Each agent is specialized with:
- **Role**: Specific responsibility (e.g., "Property Recommender")
- **Expertise**: Domain knowledge about real estate
- **Tools**: Specific functions agent can execute
- **Memory**: Agent-specific context and conversation history
- **Decision Rules**: How to handle edge cases and errors

### 3.2 Six Core Agents

#### 3.2.1 Property Recommender Agent
- **Purpose**: Analyze user preferences and recommend properties
- **Tools**:
  - `search_by_criteria(budget, bedrooms, location, type)`
  - `get_user_preferences()`
  - `rank_properties(properties, user_profile)`
  - `personalize_recommendations(preferences)`
- **Process**:
  1. Extract user preferences from conversation
  2. Query database for matching properties
  3. Rank by relevance score
  4. Present top 5-10 recommendations with explanations
- **Success Metric**: User engagement with recommendations

#### 3.2.2 Market Trend Analyzer Agent
- **Purpose**: Analyze market data and provide insights
- **Tools**:
  - `get_market_statistics(city, property_type, time_period)`
  - `calculate_price_trends()`
  - `identify_opportunities()`
  - `generate_market_report()`
- **Process**:
  1. Collect price data from database
  2. Calculate trend lines and moving averages
  3. Identify growth opportunities
  4. Generate visualizable insights
- **Success Metric**: Accuracy of trend predictions

#### 3.2.3 Price Estimator Agent
- **Purpose**: Estimate property prices using ML models
- **Tools**:
  - `estimate_price(property_features)`
  - `compare_market_prices()`
  - `apply_adjustments(base_price, adjustments)`
  - `validate_price_range()`
- **Process**:
  1. Extract property features
  2. Find comparable properties
  3. Apply hedonic pricing model
  4. Calculate estimated value with confidence interval
- **Success Metric**: MAE (Mean Absolute Error) < 10%

#### 3.2.4 Document Parser Agent
- **Purpose**: Extract information from property documents
- **Tools**:
  - `parse_pdf(document_url)`
  - `extract_text_sections()`
  - `validate_document_data()`
  - `store_parsed_info()`
- **Process**:
  1. Download/access document
  2. OCR if needed
  3. Extract key information (legal details, features, terms)
  4. Validate extracted data
- **Success Metric**: 95% extraction accuracy

#### 3.2.5 Loan Calculator Agent
- **Purpose**: Calculate financing options and mortgage rates
- **Tools**:
  - `calculate_monthly_payment(principal, rate, term)`
  - `get_interest_rates(credit_score, loan_type)`
  - `compare_loan_options()`
  - `generate_amortization_schedule()`
- **Process**:
  1. Gather loan parameters
  2. Fetch current interest rates
  3. Calculate payments for various terms
  4. Compare bank options
- **Success Metric**: Accurate financial calculations

#### 3.2.6 Chat Assistant Agent
- **Purpose**: General user support and guidance
- **Tools**:
  - `answer_faq(question)`
  - `escalate_to_human(issue_type)`
  - `route_to_specialist(agent_type)`
  - `track_conversation()`
- **Process**:
  1. Receive user query
  2. Check FAQ database first
  3. Route to specialist agents if needed
  4. Provide general guidance or escalate

### 3.3 New Agents (Future Implementation)

#### 3.3.7 Search Optimizer Agent
- Optimizes search queries for better results
- Learns from user behavior
- Suggests refined search terms

#### 3.3.8 Report Generator Agent
- Creates detailed property reports
- Generates market analysis PDFs
- Exports data in multiple formats

## 4. Tool Calling System

### 4.1 Tool Registry
\`\`\`
Tools Available:
1. Database Operations
   - query_properties(filters)
   - get_property_details(id)
   - search_by_location(coords, radius)
   - get_similar_properties(property_id)

2. Data Processing
   - calculate_statistics(data_set)
   - apply_filters(data, criteria)
   - transform_data(data, format)
   - aggregate_data(data, group_by)

3. External Services
   - get_geocoding_info(address)
   - send_notification(user_id, message)
   - schedule_appointment(data)
   - send_document(user_id, document_url)

4. AI Services
   - generate_summary(text)
   - translate_text(text, language)
   - extract_entities(text)
   - sentiment_analysis(text)

5. Media Operations
   - process_image(image_url)
   - generate_thumbnail(image_url)
   - optimize_image(image_url)
\`\`\`

### 4.2 Tool Calling Protocol
\`\`\`
Request Format:
{
  "agent": "PropertyRecommender",
  "intent": "recommend_properties",
  "tools_needed": [
    {
      "name": "search_by_criteria",
      "params": {
        "budget": 50000000,
        "bedrooms": 3,
        "location": "Lekki",
        "property_type": "Apartment"
      }
    },
    {
      "name": "rank_properties",
      "params": {
        "properties": "results_from_search",
        "user_profile": "user_123"
      }
    }
  ]
}

Response Format:
{
  "status": "success",
  "agent": "PropertyRecommender",
  "results": [...],
  "execution_time": "2.3s",
  "tokens_used": 450,
  "cost": 0.0045
}
\`\`\`

## 5. Context Management & Memory System

### 5.1 Conversation Memory Types

#### Short-term Memory (Session)
- Current user query
- Recent messages (last 10)
- Current agent focus
- **Duration**: Session lifetime
- **Storage**: Redis cache

#### Long-term Memory (Persistent)
- User preferences
- Search history
- Saved properties
- Conversation summaries
- **Duration**: 90 days
- **Storage**: Supabase

#### Episodic Memory (Task-specific)
- Current task context
- Tool execution history
- Intermediate results
- **Duration**: Task lifetime
- **Storage**: In-memory

### 5.2 Context Window Management
\`\`\`
Total Context Tokens: 128,000
- System Prompt: 2,000 tokens
- Agent Instructions: 3,000 tokens
- Tool Definitions: 2,000 tokens
- Conversation History: 40,000 tokens
- Retrieved Context: 30,000 tokens
- User Input: 1,000 tokens
- Buffer for Output: 50,000 tokens
\`\`\`

## 6. Vector Embeddings & Semantic Search

### 6.1 Embedding Configuration
- **Model**: OpenAI text-embedding-3-small (384 dimensions) or large (1536)
- **Update Frequency**: Real-time for new properties
- **Storage**: Supabase vector extension with pgvector
- **Indexing**: IVFFlat for fast similarity search

### 6.2 Vector Search Implementation
\`\`\`sql
SELECT 
  id, title, address, 
  distance_metric(embedding, query_embedding) AS similarity
FROM properties_embeddings
WHERE distance_metric(embedding, query_embedding) < 0.3
ORDER BY similarity DESC
LIMIT 10;
\`\`\`

### 6.3 Use Cases for Vector Search
1. **Semantic Property Search**: "Find properties similar to this one"
2. **Preference Matching**: Match users to properties based on preferences
3. **Query Expansion**: Expand user queries with synonyms
4. **Duplicate Detection**: Find duplicate property listings
5. **Conversation Search**: Find relevant past conversations

## 7. API Specifications

### 7.1 Main Endpoints

#### POST /api/ai/chat
Multi-turn conversational AI endpoint
\`\`\`
Request:
{
  "messages": [
    {"role": "user", "content": "Find me a 3-bedroom apartment in Lekki"}
  ],
  "agent": "PropertyRecommender",
  "session_id": "session_123",
  "context": {}
}

Response:
{
  "response": "I found 15 apartments matching your criteria...",
  "agent_used": "PropertyRecommender",
  "tools_executed": ["search_by_criteria", "rank_properties"],
  "properties": [...],
  "next_actions": ["View details", "Schedule tour", "Ask price"],
  "conversation_id": "conv_456"
}
\`\`\`

#### POST /api/ai/agents/execute
Direct agent execution
\`\`\`
Request:
{
  "agent": "PriceEstimator",
  "action": "estimate_price",
  "params": {
    "property_id": "prop_123",
    "comparable_properties": 5
  }
}

Response:
{
  "estimated_price": 75500000,
  "confidence_interval": [71000000, 80000000],
  "model_used": "hedonic_pricing_v2",
  "comparable_count": 5,
  "factors": {...}
}
\`\`\`

#### GET /api/ai/agents
List available agents and their capabilities
\`\`\`
Response:
[
  {
    "id": "property-recommender",
    "name": "Property Recommender",
    "capabilities": ["search", "rank", "recommend"],
    "tools": [...],
    "status": "active"
  },
  ...
]
\`\`\`

#### POST /api/ai/vector-search
Vector similarity search
\`\`\`
Request:
{
  "query": "Luxury apartment with pool and gym",
  "limit": 10,
  "filters": {
    "city": "Lekki",
    "price_min": 30000000,
    "price_max": 200000000
  }
}

Response:
{
  "results": [...],
  "search_time": "0.23s",
  "total_matches": 45
}
\`\`\`

## 8. Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Core NLP preprocessing pipeline
- [ ] Intent detection system
- [ ] Entity recognition module
- [ ] Vector embedding setup

### Phase 2: Agents (Week 2-3)
- [ ] Property Recommender Agent
- [ ] Market Analyzer Agent
- [ ] Price Estimator Agent
- [ ] Chat Assistant Agent

### Phase 3: Advanced Features (Week 3-4)
- [ ] Tool calling framework
- [ ] Conversation memory system
- [ ] Vector semantic search
- [ ] Multi-turn conversations

### Phase 4: Production (Week 4-5)
- [ ] Performance optimization
- [ ] Error handling & fallbacks
- [ ] Rate limiting & quotas
- [ ] Monitoring & logging
- [ ] Deployment & scaling

## 9. Performance Metrics & KPIs

### 9.1 System Performance
- **Average Response Time**: < 2.5 seconds
- **P95 Response Time**: < 5 seconds
- **Availability**: 99.5%
- **Token Usage**: < 1000 tokens per request (avg)

### 9.2 AI Quality Metrics
- **Intent Detection Accuracy**: > 94%
- **Entity Extraction F1 Score**: > 0.92
- **Recommendation CTR**: > 15%
- **User Satisfaction**: > 4.2/5

### 9.3 Business Metrics
- **Agent Task Success Rate**: > 92%
- **User Retention**: > 70% (30-day)
- **Property View-through Rate**: > 40%
- **Conversion to Inquiry**: > 8%

## 10. Error Handling & Fallback Strategies

### 10.1 Common Error Scenarios
1. **API Rate Limiting**: Queue request, notify user of wait time
2. **Missing Data**: Use alternative data sources, inform user of limitations
3. **Model Errors**: Fall back to rule-based system
4. **Tool Failure**: Escalate to alternative tool or human agent
5. **Context Loss**: Reload from persistent memory, ask for clarification

### 10.2 Fallback Logic
\`\`\`
Level 1: Use alternative model
Level 2: Use cached/pre-computed results
Level 3: Use rule-based system
Level 4: Suggest manual interaction
Level 5: Escalate to human support
\`\`\`

## 11. Security & Compliance

### 11.1 Data Protection
- All user data encrypted at rest (AES-256)
- SSL/TLS for data in transit
- API keys never logged or exposed
- Conversation history retention: 90 days default

### 11.2 Access Control
- Role-based access (user, agent, admin)
- Token-based authentication (JWT)
- Rate limiting per user (100 requests/minute)
- API key rotation every 30 days

### 11.3 Compliance
- GDPR compliant data handling
- User consent for data collection
- Right to deletion implemented
- Audit logging for all AI decisions

## 12. Anticipated Delays & Risks

### 12.1 Technical Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Vector DB Performance | Medium | High | Implement caching, optimization |
| Token Limits Exceeded | Low | High | Request limit increases, optimize prompts |
| Multi-Agent Conflicts | Medium | Medium | Define clear agent boundaries |
| API Rate Limits | Medium | Medium | Implement queue system |
| Memory Leaks in Agents | Low | High | Rigorous testing, monitoring |

### 12.2 Expected Timeline Adjustments
- **NLP Pipeline Implementation**: +1 week (complexity of entity extraction)
- **Agent Orchestration**: +3-5 days (CrewAI learning curve)
- **Vector Search Optimization**: +3 days (index tuning)
- **Production Hardening**: +1 week (extensive testing needed)

**Total Expected Development Time**: 4-5 weeks (from current state)

### 12.3 Contingency Plans
1. Start with simpler intent detection if NLP takes longer
2. Use single-agent mode if multi-agent orchestration delays
3. Deploy without vector search initially, add later
4. Use GPT-4 directly without custom agents first, then optimize

## 13. Success Criteria

### 13.1 Functional Requirements
- [ ] Chat interface responds to 95%+ user queries
- [ ] All 6 agents successfully execute assigned tasks
- [ ] Vector search returns relevant results in < 1 second
- [ ] Tool calling works without manual intervention

### 13.2 Non-Functional Requirements
- [ ] System handles 1000 concurrent users
- [ ] 99.5% availability SLA maintained
- [ ] All requests logged and monitored
- [ ] Cost per request < $0.01 average

### 13.3 User Experience Requirements
- [ ] Conversation feels natural and helpful
- [ ] Response time acceptable (< 3s)
- [ ] Users can understand AI recommendations
- [ ] Error messages are helpful, not cryptic
