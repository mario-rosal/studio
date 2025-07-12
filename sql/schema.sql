-- Create the executions table
CREATE TABLE executions (
    id UUID PRIMARY KEY,
    flow_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('Success', 'Failure')),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    duration REAL NOT NULL,
    input_type VARCHAR(255),
    input_data TEXT,
    input_attachment TEXT,
    output_type VARCHAR(255),
    output_data TEXT,
    output_attachment TEXT,
    logs TEXT,
    tokens_used INTEGER
);

-- Create the parameters table
CREATE TABLE parameters (
    id UUID PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT,
    description TEXT
);

-- Create the users table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar VARCHAR(255),
    role VARCHAR(50) NOT NULL CHECK (role IN ('Administrator', 'Viewer', 'Technician')),
    status VARCHAR(50) NOT NULL CHECK (status IN ('Active', 'Locked', 'Invited'))
);
