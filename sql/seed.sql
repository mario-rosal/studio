-- This script seeds the 'executions' table with the sample data previously hardcoded in the application.

-- Clear existing data to prevent duplicates on re-run
DELETE FROM executions;

INSERT INTO executions (id, flow_name, status, "timestamp", duration, input_type, input_data, output_type, output_data, logs) VALUES
('a3c1e2f0-9b8d-4c6a-8e7f-1a2b3c4d5e6f', 'Customer Onboarding', 'Success', NOW() - INTERVAL '1 minute', 12.5, 'email', 'new.customer@example.com', 'database', 'User ID 123 created', '2023-10-27 10:00:00 - INFO: Starting flow ''Customer Onboarding''
2023-10-27 10:00:01 - INFO: Parsing email input
2023-10-27 10:00:05 - INFO: Creating user in database
2023-10-27 10:00:12 - INFO: Flow completed successfully'),
('b4d2f1e0-a9c8-4b7d-9f8e-2b3c4d5e6f7a', 'Invoice Processing', 'Failure', NOW() - INTERVAL '5 minutes', 5.2, 'pdf', 'invoice_abc.pdf', 'json', '{''error'': ''Invalid PDF format''}', '2023-10-27 09:55:00 - INFO: Starting flow ''Invoice Processing''
2023-10-27 09:55:01 - INFO: Reading PDF input
2023-10-27 09:55:05 - ERROR: Failed to parse PDF content. Error: Invalid PDF format.'),
('c5e3g2f1-b0d9-5c8e-af9f-3c4d5e6f7a8b', 'Daily Report Generation', 'Success', NOW() - INTERVAL '1 day', 125.0, 'database', 'Query: SELECT * FROM sales', 'email', 'Sent to daily-reports@example.com', '2023-10-26 08:00:00 - INFO: Starting flow ''Daily Report Generation''
2023-10-26 08:02:05 - INFO: Report generated and sent.'),
('d6f4h3g2-c1e0-6d9f-bf0g-4d5e6f7a8b9c', 'Social Media Posting', 'Success', NOW() - INTERVAL '2 days', 30.8, 'text', 'New blog post is live!', 'json', '{''postId'': ''xyz789''}', '2023-10-25 15:30:00 - INFO: Posting to social media channels.
2023-10-25 15:30:30 - INFO: Posted successfully.'),
('e7g5i4h3-d2f1-7ea0-cg1h-5e6f7a8b9c0d', 'Inventory Update', 'Success', NOW() - INTERVAL '3 days', 45.1, 'json', '{''sku'': ''SHOE-01'', ''quantity'': 50}', 'database', 'Inventory for SHOE-01 updated.', '2023-10-24 11:00:00 - INFO: Updating inventory.
2023-10-24 11:00:45 - INFO: Update complete.'),
('f8h6j5i4-e3g2-8fb1-dh2i-6f7a8b9c0d1e', 'Customer Onboarding', 'Failure', NOW() - INTERVAL '4 days', 15.3, 'email', 'test.user@example.com', 'json', '{''error'': ''Email already exists''}', '2023-10-23 14:00:00 - INFO: Starting flow ''Customer Onboarding''.
2023-10-23 14:00:15 - ERROR: Email already registered.'),
('g9i7k6j5-f4h3-9gc2-ei3j-7a8b9c0d1e2f', 'Lead Qualification', 'Success', NOW() - INTERVAL '5 days', 62.0, 'file', 'leads.csv', 'database', '15 new leads qualified and added.', '2023-10-22 09:00:00 - INFO: Processing new leads from CSV.
2023-10-22 09:01:02 - INFO: Leads qualified.'),
('h0j8l7k6-g5i4-0hd3-fj4k-8b9c0d1e2f3a', 'Invoice Processing', 'Success', NOW() - INTERVAL '6 days', 8.9, 'pdf', 'invoice_def.pdf', 'database', 'Invoice DEF processed.', '2023-10-21 16:20:00 - INFO: Processing invoice PDF.
2023-10-21 16:20:08 - INFO: Invoice data extracted and saved.'),
('i1k9m8l7-h6j5-1ie4-gk5l-9c0d1e2f3a4b', 'User Deactivation', 'Success', NOW() - INTERVAL '7 days', 3.1, 'json', '{''userId'': 456}', 'database', 'User 456 deactivated.', '2023-10-20 18:00:00 - INFO: Deactivating user.
2023-10-20 18:00:03 - INFO: User status updated.'),
('j2l0n9m8-i7k6-2jf5-hl6m-0d1e2f3a4b5c', 'Data Backup', 'Success', NOW() - INTERVAL '8 days', 305.7, 'database', 'All tables', 'file', 'backup_2023-10-19.sql.gz', '2023-10-19 02:00:00 - INFO: Starting nightly backup.
2023-10-19 02:05:05 - INFO: Backup complete.');
