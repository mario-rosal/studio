-- Create the executions table
CREATE TABLE IF NOT EXISTS executions (
    id UUID PRIMARY KEY,
    flow_name TEXT NOT NULL,
    status TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    duration REAL NOT NULL,
    input_type TEXT,
    input_data TEXT,
    input_attachment TEXT,
    output_type TEXT,
    output_data TEXT,
    output_attachment TEXT,
    logs TEXT,
    tokens_used INTEGER
);

-- Create the parameters table
CREATE TABLE IF NOT EXISTS parameters (
    id UUID PRIMARY KEY,
    key TEXT NOT NULL UNIQUE,
    value TEXT,
    description TEXT
);

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    avatar TEXT,
    role TEXT NOT NULL,
    status TEXT NOT NULL,
    password TEXT
);
