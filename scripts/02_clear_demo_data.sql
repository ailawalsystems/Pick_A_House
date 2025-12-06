-- Clear all demo data
DELETE FROM messages;
DELETE FROM property_features;
DELETE FROM properties;
DELETE FROM contacts;
DELETE FROM llm_configs;

-- Restart sequences if needed
ALTER SEQUENCE IF EXISTS properties_id_seq RESTART;
ALTER SEQUENCE IF EXISTS contacts_id_seq RESTART;
ALTER SEQUENCE IF EXISTS messages_id_seq RESTART;
