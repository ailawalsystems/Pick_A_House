-- =============================================================================
-- PRODUCTION DEPLOYMENT STRATEGY & MAINTENANCE SCRIPTS
-- =============================================================================
-- This script ensures database integrity, security, and performance for production

-- Step 1: VERIFY SCHEMA INTEGRITY
-- =============================================================================
-- Run this to check all tables exist with correct structure

SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = 'public' AND table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Step 2: VERIFY RLS POLICIES ARE ENABLED
-- =============================================================================

SELECT 
  tablename,
  EXISTS(SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = t.tablename) as has_policies,
  (SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public' AND tablename = t.tablename) as policy_count
FROM pg_tables t
WHERE schemaname = 'public'
ORDER BY tablename;

-- Step 3: VERIFY INDEXES FOR PERFORMANCE
-- =============================================================================

SELECT 
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- Step 4: CHECK DATABASE SIZE AND STATS
-- =============================================================================

SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as total_size,
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = schemaname AND table_name = tablename) as exists
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Step 5: PRODUCTION CHECKLIST - VERIFY DATA CONSISTENCY
-- =============================================================================

-- Check for orphaned property features
SELECT COUNT(*) as orphaned_features
FROM property_features pf
LEFT JOIN properties p ON pf.property_id = p.id
WHERE p.id IS NULL;

-- Check for properties with invalid types
SELECT COUNT(*) as invalid_properties
FROM properties
WHERE property_type NOT IN ('Apartment', 'House', 'Villa', 'Townhouse', 'Land', 'Office', 'Shop', 'Warehouse', 'Other')
OR listing_type NOT IN ('sale', 'rent');

-- Check for negative prices
SELECT COUNT(*) as invalid_prices
FROM properties
WHERE price <= 0;

-- Check for messages without valid sender
SELECT COUNT(*) as orphaned_messages
FROM messages m
LEFT JOIN auth.users u ON m.sender_id = u.id
WHERE u.id IS NULL;

-- Step 6: DATABASE MAINTENANCE - CLEAN CACHE
-- =============================================================================

-- Analyze tables for query planner optimization
ANALYZE properties;
ANALYZE property_features;
ANALYZE contacts;
ANALYZE messages;
ANALYZE llm_configs;

-- Vacuum tables to reclaim space (if needed)
-- VACUUM FULL properties;
-- VACUUM FULL property_features;
-- VACUUM FULL contacts;
-- VACUUM FULL messages;
-- VACUUM FULL llm_configs;

-- Step 7: MONITORING QUERIES
-- =============================================================================

-- Top 10 most expensive queries (if pg_stat_statements enabled)
SELECT 
  query,
  calls,
  mean_time,
  max_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Activity monitor - current connections
SELECT 
  pid,
  usename,
  application_name,
  client_addr,
  state,
  query_start,
  state_change
FROM pg_stat_activity
WHERE state IS NOT NULL
ORDER BY query_start DESC;

-- Step 8: BACKUP VERIFICATION
-- =============================================================================

-- Get last transaction ID (for backup verification)
SELECT txid_current();

-- Check table modification times
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) as size,
  CASE WHEN pg_stat_get_live_tuples(c.oid) > 0 THEN 
    'Has data' ELSE 'Empty' 
  END as data_status
FROM pg_tables t
JOIN pg_class c ON c.relname = t.tablename
WHERE schemaname = 'public'
ORDER BY t.tablename;
