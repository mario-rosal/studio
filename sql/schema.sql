CREATE TABLE IF NOT EXISTS executions (
    id UUID PRIMARY KEY,
    flow_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    duration REAL NOT NULL,
    input_type VARCHAR(100),
    input_data TEXT,
    input_attachment TEXT,
    output_type VARCHAR(100),
    output_data TEXT,
    output_attachment TEXT,
    logs TEXT,
    tokens_used INTEGER
);

CREATE TABLE IF NOT EXISTS parameters (
    id UUID PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar VARCHAR(255),
    role VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    password TEXT
);
