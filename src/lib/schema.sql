-- Users Table
CREATE TYPE user_role AS ENUM ('Administrator', 'Viewer', 'Technician');
CREATE TYPE user_status AS ENUM ('Active', 'Locked', 'Invited');

CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    avatar TEXT,
    role user_role NOT NULL,
    status user_status NOT NULL
);

-- Parameters Table
CREATE TABLE parameters (
    id TEXT PRIMARY KEY,
    key TEXT NOT NULL UNIQUE,
    value TEXT NOT NULL,
    description TEXT
);

-- Executions Table
CREATE TYPE execution_status AS ENUM ('Success', 'Failure');
CREATE TYPE io_type AS ENUM ('email', 'pdf', 'json', 'database', 'file', 'text');

CREATE TABLE executions (
    id TEXT PRIMARY KEY,
    flow_name TEXT NOT NULL,
    status execution_status NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    duration REAL NOT NULL,
    input_type io_type NOT NULL,
    input_data TEXT NOT NULL,
    input_attachment TEXT,
    output_type io_type NOT NULL,
    output_data TEXT NOT NULL,
    output_attachment TEXT,
    logs TEXT NOT NULL
);

-- Insert initial data for Users
INSERT INTO users (id, name, email, avatar, role, status) VALUES
('user_01', 'Alice Johnson', 'alice@example.com', 'https://i.pravatar.cc/150?u=a042581f4e29026024d', 'Administrator', 'Active'),
('user_02', 'Bob Williams', 'bob@example.com', 'https://i.pravatar.cc/150?u=a042581f4e29026704d', 'Technician', 'Active'),
('user_03', 'Charlie Brown', 'charlie@example.com', 'https://i.pravatar.cc/150?u=a04258114e29026702d', 'Viewer', 'Active'),
('user_04', 'Diana Prince', 'diana@example.com', 'https://i.pravatar.cc/150?u=a042581f4e29026706d', 'Technician', 'Locked');

-- Insert initial data for Parameters
INSERT INTO parameters (id, key, value, description) VALUES
('param_01', 'MIN_INVOICE_AMOUNT', '100', 'Minimum amount to trigger high-value workflow.'),
('param_02', 'ADMIN_EMAIL', 'admin@mytaskpanel.com', 'Email for critical error notifications.'),
('param_03', 'CRM_API_KEY', '**********', 'API Key for the main CRM system.'),
('param_04', 'WELCOME_EMAIL_SUBJECT', 'Welcome to MyTaskPanel!', 'Subject line for new user welcome emails.');

-- Insert initial data for Executions
INSERT INTO executions (id, flow_name, status, timestamp, duration, input_type, input_data, output_type, output_data, logs) VALUES
('exec_001', 'Onboard New Client', 'Success', NOW() - INTERVAL '1 hour', 12.5, 'json', '{ "client": "Innovate Inc." }', 'database', 'User ID 123 created', 'INFO: Starting flow. \nINFO: Received JSON input. \nINFO: Creating user in database. \nSUCCESS: User created successfully. \nINFO: Flow finished.'),
('exec_002', 'Process Invoice', 'Failure', NOW() - INTERVAL '2 hours', 5.2, 'pdf', 'invoice_456.pdf', 'email', 'Failed to process invoice', 'INFO: Starting flow. \nINFO: Received PDF input. \nERROR: Could not parse PDF content. Invalid format. \nINFO: Sending failure notification email. \nINFO: Flow finished.'),
('exec_003', 'Daily Report Generation', 'Success', NOW() - INTERVAL '5 hours', 45.8, 'email', 'Subject: Run daily report', 'file', 'daily_report.csv', 'INFO: Starting flow. \nINFO: Received email trigger. \nINFO: Fetching data from production DB. \nINFO: Aggregating results. \nINFO: Generating CSV file. \nSUCCESS: Report generated. \nINFO: Flow finished.'),
('exec_004', 'Onboard New Client', 'Success', NOW() - INTERVAL '10 hours', 11.9, 'json', '{ "client": "Synergy Corp." }', 'database', 'User ID 124 created', 'INFO: Starting flow. \nINFO: Received JSON input. \nINFO: Creating user in database. \nSUCCESS: User created successfully. \nINFO: Flow finished.'),
('exec_005', 'Process Invoice', 'Success', NOW() - INTERVAL '15 hours', 8.1, 'pdf', 'invoice_789.pdf', 'database', 'Invoice 789 processed', 'INFO: Starting flow. \nINFO: Received PDF input. \nINFO: Parsing PDF content. \nINFO: Updating database record. \nSUCCESS: Invoice processed. \nINFO: Flow finished.');

-- Alter executions table input/output types to include 'text'
ALTER TYPE io_type ADD VALUE 'text';

