-- Table to store automation workflow executions, including their inputs, outputs, and logs.
CREATE TABLE executions (
    id UUID PRIMARY KEY,
    flow_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('Success', 'Failure')),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    duration REAL,
    input_type VARCHAR(255),
    input_data TEXT,
    input_attachment TEXT,
    output_type VARCHAR(255),
    output_data TEXT,
    output_attachment TEXT,
    logs TEXT
);

-- Table to store global parameters or variables used by automation workflows.
CREATE TABLE parameters (
    id UUID PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT
);

-- Table to store user information and their roles for accessing the application.
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar TEXT,
    role VARCHAR(50) NOT NULL CHECK (role IN ('Administrator', 'Technician', 'Viewer')),
    status VARCHAR(50) NOT NULL CHECK (status IN ('Active', 'Locked', 'Invited'))
);
