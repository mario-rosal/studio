-- Clear existing data
TRUNCATE TABLE executions, parameters, users RESTART IDENTITY;

-- Seed executions table
INSERT INTO executions (id, flow_name, status, timestamp, duration, input_type, input_data, output_type, output_data, logs, tokens_used) VALUES
('a3a8f9b1-72f8-4b1a-8b1e-3f2d2f7b1e4a', 'Customer Onboarding', 'Success', NOW() - INTERVAL '1 minute', 12.5, 'email', 'new.customer@example.com', 'database', 'User ID 123 created', '2023-10-27 10:00:00 - INFO: Starting flow ''Customer Onboarding''...', 1200),
('b4b9f9c2-83f9-4c2b-9c2f-4g3e3g8c2f5b', 'Invoice Processing', 'Failure', NOW() - INTERVAL '5 minutes', 5.2, 'pdf', 'invoice_abc.pdf', 'json', '{"error": "Invalid PDF format"}', '2023-10-27 09:55:00 - ERROR: Failed to parse PDF content.', 450),
('c5c9g9d3-94g9-4d3c-1d3g-5h4f4h9d3g6c', 'Daily Report Generation', 'Success', NOW() - INTERVAL '1 day', 125.0, 'database', 'Query: SELECT * FROM sales', 'email', 'Sent to daily-reports@example.com', '2023-10-26 08:00:00 - INFO: Report generated and sent.', 2500),
('d6d1h1e4-15h1-4e4d-2e4h-6i5g5i1e4h7d', 'Social Media Posting', 'Success', NOW() - INTERVAL '2 days', 30.8, 'text', 'New blog post is live!', 'json', '{"postId": "xyz789"}', '2023-10-25 15:30:00 - INFO: Posted successfully.', 300),
('e7e2i2f5-26i2-4f5e-3f5i-7j6h6j2f5i8e', 'Inventory Update', 'Success', NOW() - INTERVAL '3 days', 45.1, 'json', '{"sku": "SHOE-01", "quantity": 50}', 'database', 'Inventory for SHOE-01 updated.', '2023-10-24 11:00:00 - INFO: Update complete.', 150),
('f8f3j3g6-37j3-4g6f-4g6j-8k7i7k3g6j9f', 'Customer Onboarding', 'Failure', NOW() - INTERVAL '4 days', 15.3, 'email', 'test.user@example.com', 'json', '{"error": "Email already exists"}', '2023-10-23 14:00:00 - ERROR: Email already registered.', 800),
('g9g4k4h7-48k4-4h7g-5h7k-9l8j8l4h7k1g', 'Lead Qualification', 'Success', NOW() - INTERVAL '5 days', 62.0, 'file', 'leads.csv', 'database', '15 new leads qualified and added.', '2023-10-22 09:00:00 - INFO: Processing new leads from CSV.', 3200),
('h1h5l5i8-59l5-4i8h-6i8l-1m9k9m5i8l2h', 'Invoice Processing', 'Success', NOW() - INTERVAL '6 days', 8.9, 'pdf', 'invoice_def.pdf', 'database', 'Invoice DEF processed.', '2023-10-21 16:20:00 - INFO: Processing invoice PDF.', 550),
('i2i6m6j9-61m6-4j9i-7j9m-2n1l1n6j9m3i', 'User Deactivation', 'Success', NOW() - INTERVAL '7 days', 3.1, 'json', '{"userId": 456}', 'database', 'User 456 deactivated.', '2023-10-20 18:00:00 - INFO: Deactivating user.', 50),
('j3j7n7k1-72n7-4k1j-8k1n-3o2m2o7k1n4j', 'Data Backup', 'Success', NOW() - INTERVAL '8 days', 305.7, 'database', 'All tables', 'file', 'backup_2023-10-19.sql.gz', '2023-10-19 02:00:00 - INFO: Starting nightly backup.', 10);

-- Seed parameters table
INSERT INTO parameters (id, key, value, description) VALUES
('1a9b2c3d-4e5f-4a6b-8c7d-8e9f0a1b2c3d', 'API_ENDPOINT_PAYMENTS', 'https://api.stripe.com/v1', 'The base URL for the Stripe Payments API.'),
('2b1c3d4e-5f6a-4b7c-8d9e-9f0a1b2c3d4e', 'SUPPORT_EMAIL_ADDRESS', 'support@mytaskpanel.com', 'Email address for customer support inquiries.'),
('3c2d4e5f-6a7b-4c8d-9e0f-0a1b2c3d4e5f', 'MAX_RETRIES', '3', 'Maximum number of retries for failed API calls.'),
('4d3e5f6a-7b8c-4d9e-0f1a-1b2c3d4e5f6a', 'DEFAULT_CURRENCY', 'USD', 'Default currency for financial transactions.');

-- Seed users table
INSERT INTO users (id, name, email, avatar, role, status) VALUES
('a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6', 'Alice Johnson', 'alice@example.com', 'https://i.pravatar.cc/150?u=alice', 'Administrator', 'Active'),
('b2c3d4e5-f6a7-b8c9-d0e1-f2a3b4c5d6e7', 'Bob Williams', 'bob@example.com', 'https://i.pravatar.cc/150?u=bob', 'Technician', 'Active'),
('c3d4e5f6-a7b8-c9d0-e1f2-a3b4c5d6e7f8', 'Charlie Brown', 'charlie@example.com', 'https://i.pravatar.cc/150?u=charlie', 'Viewer', 'Locked'),
('d4e5f6a7-b8c9-d0e1-f2a3-b4c5d6e7f8g9', 'Diana Prince', 'diana@example.com', 'https://i.pravatar.cc/150?u=diana', 'Technician', 'Invited');
