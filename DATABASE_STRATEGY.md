# Production Database Strategy - Pick Your House FCT

## Overview
This document outlines the comprehensive database strategy for deploying the Pick Your House FCT application to production.

---

## 1. Database Architecture

### Normalized Schema with Proper Relationships
\`\`\`
auth.users (Supabase Auth)
  ├── properties (1:N) - user owns many properties
  │   └── property_features (1:N) - property has many features
  ├── contacts (1:N) - user has many contacts
  ├── messages (1:N) - user sends/receives messages
  └── llm_configs (1:1) - user has one LLM configuration
\`\`\`

### Key Design Principles
- **Normalization**: Avoided array/JSON columns, used separate tables for relationships
- **Referential Integrity**: Foreign keys enforce data consistency
- **Cascading Deletes**: Deleting a user cascades to all their data
- **Unique Constraints**: Prevent duplicate entries (e.g., one config per user)
- **Check Constraints**: Validate data quality at database level

---

## 2. Security Implementation

### Row Level Security (RLS) Policies

| Table | SELECT | INSERT | UPDATE | DELETE |
|-------|--------|--------|--------|--------|
| properties | Public | Own only | Own only | Own only |
| property_features | Public | Own properties | Own properties | Own properties |
| contacts | Own only | Own only | Own only | Own only |
| messages | Involved parties | Self as sender | Self as sender | - |
| llm_configs | Own only | Own only | Own only | Own only |

### Authentication
- Supabase Auth manages user identities
- API routes verify `auth.uid()` before operations
- Session tokens automatically refreshed
- No sensitive data (API keys) stored client-side

---

## 3. Performance Optimization

### Indexes Created
- `idx_properties_user_id` - Fast user property queries
- `idx_properties_city` - Location-based filtering
- `idx_properties_listing_type` - Sale/rent filtering
- `idx_property_features_property_id` - Feature relationships
- `idx_contacts_user_id` - User contact queries
- `idx_messages_sender_id` & `idx_messages_recipient_id` - Message lookups
- `idx_llm_configs_user_id` - Config per user lookup

### Query Optimization Tips
- Use indexed columns in WHERE clauses
- Join on foreign keys for relationship queries
- Use pagination for large result sets (implement in API routes)
- Consider caching frequently accessed data (property listings)

---

## 4. API Integration Patterns

### CRUD Operations
All API routes follow consistent patterns:

\`\`\`typescript
// GET - Fetch with filters
GET /api/properties
- Authenticated users get their properties
- Uses: SELECT with JOIN for features
- Performance: O(n) with indexes on user_id

// POST - Create with validation
POST /api/properties
- Validate input data
- Create property record
- Insert associated features
- Return created object with ID

// PUT - Update with ownership check
PUT /api/properties/[id]
- Verify auth.uid() == property.user_id
- Update properties data
- Manage feature associations
- Return updated object

// DELETE - Remove with cascade
DELETE /api/properties/[id]
- Verify ownership
- Delete cascades to features automatically
- Return success status
\`\`\`

---

## 5. Data Integrity Checks

### Pre-Production Verification
\`\`\`sql
-- Check schema completeness
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Verify RLS is enabled
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' AND rowsecurity;

-- Validate foreign keys
SELECT * FROM information_schema.table_constraints 
WHERE constraint_type = 'FOREIGN KEY';

-- Check for orphaned records
SELECT COUNT(*) FROM property_features pf
LEFT JOIN properties p ON pf.property_id = p.id
WHERE p.id IS NULL;

-- Verify price constraints
SELECT COUNT(*) FROM properties WHERE price <= 0;
\`\`\`

### Automated Health Checks
Run `scripts/05_execute_strategy.ts` for:
- Schema validation
- RLS policy verification
- Data consistency checks
- Performance analysis
- Recommendations

---

## 6. Demo Data Management

### Clear Demo Data (One-Time)
\`\`\`bash
# Option 1: Run SQL directly in Supabase SQL Editor
psql -h <host> -U <user> -d <database> < scripts/02_clear_demo_data.sql

# Option 2: Run TypeScript script
npm run scripts:clear-demo
# Or manually call:
# DELETE FROM messages;
# DELETE FROM property_features;
# DELETE FROM properties;
# DELETE FROM contacts;
\`\`\`

### Seed Production Data
\`\`\`bash
# For testing/seeding with realistic data
curl -X POST http://localhost:3000/api/properties/seed

# To clear seeded data
curl -X DELETE http://localhost:3000/api/properties/seed
\`\`\`

---

## 7. Backup & Recovery Strategy

### Backup Schedule
- **Daily**: Automated backups by Supabase
- **Weekly**: Manual point-in-time recovery snapshots
- **Monthly**: Full database export for archival

### Recovery Procedures
1. **Point-in-Time Recovery**: Use Supabase backup UI
2. **Data Restoration**: 
   - Restore from backup
   - Run schema verification
   - Validate data consistency
3. **Rollback Plan**:
   - Keep previous database version running in parallel
   - Test migrations on staging first
   - Use gradual rollout strategy

---

## 8. Monitoring & Alerts

### Key Metrics to Monitor
- Database connection pool usage
- Query response times (target: <100ms average)
- Disk space usage
- Failed authentication attempts
- RLS policy violations

### Alert Triggers
- [ ] Connection pool > 80% capacity
- [ ] Query time > 1000ms
- [ ] Disk space < 20% available
- [ ] Failed authentications > 10/min
- [ ] Constraint violations logged

### Logging
- All API operations logged with timestamp
- Failed operations include error details
- Access logs for audit trail
- Debug logs in development only

---

## 9. Migration & Deployment

### Migration Procedure
1. **Backup current database**
2. **Run schema migrations** (`01_create_schema.sql`)
3. **Clear demo data** (`02_clear_demo_data.sql`)
4. **Seed production data** (if needed)
5. **Verify data integrity** (queries from section 5)
6. **Enable monitoring**
7. **Document changes**

### Testing Checklist
- [ ] All CRUD operations work
- [ ] RLS policies enforce correctly
- [ ] Foreign keys maintain integrity
- [ ] Performance benchmarks met
- [ ] Backup/restore tested
- [ ] API error handling works
- [ ] Authentication flow complete
- [ ] Forms save to database
- [ ] Data retrieved correctly

---

## 10. Scaling Considerations

### Current Capacity (Development)
- ~1,000 properties
- ~10,000 contacts
- ~100,000 messages
- Suitable for ~100-500 active users

### Scaling for Production
- **1,000+ users**: Add read replicas, implement caching
- **10,000+ users**: Partition large tables, use connection pooling
- **100,000+ users**: Implement sharding, separate databases by region

### Optimization Steps
1. Implement Redis caching for frequently accessed data
2. Add database read replicas for scaling queries
3. Partition properties table by city/location
4. Archive old messages (>1 year) to cold storage
5. Implement full-text search for property search

---

## 11. Production Rollout Checklist

### Pre-Launch
- [ ] Database schema created and verified
- [ ] RLS policies enabled and tested
- [ ] Indexes created for performance
- [ ] Backup system configured
- [ ] Monitoring & alerts set up
- [ ] API error handling tested
- [ ] Authentication verified
- [ ] Load testing completed
- [ ] Disaster recovery plan documented
- [ ] Team trained on procedures

### Post-Launch
- [ ] Monitor database metrics
- [ ] Check error logs daily
- [ ] Verify backups are working
- [ ] Performance stays within SLA
- [ ] User data protected
- [ ] Scale infrastructure as needed

---

## 12. Contact & Support

For production database issues:
1. Check `DATABASE_STRATEGY.md` (this document)
2. Run health checks: `npm run scripts:health-check`
3. Review logs: Supabase Dashboard > Logs
4. Contact: Database admin / DevOps team

---

**Last Updated**: December 2024
**Version**: 1.0 - Production Ready
**Status**: Approved for Production Deployment
