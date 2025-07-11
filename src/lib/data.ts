import type { Execution, Parameter, User } from './types';

export const executions: Execution[] = [
  {
    id: 'exec_001',
    flowName: 'Onboard New Client',
    status: 'Success',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    duration: 12.5,
    input: { type: 'json', data: '{ "client": "Innovate Inc." }' },
    output: { type: 'database', data: 'User ID 123 created' },
    logs: 'INFO: Starting flow. \nINFO: Received JSON input. \nINFO: Creating user in database. \nSUCCESS: User created successfully. \nINFO: Flow finished.'
  },
  {
    id: 'exec_002',
    flowName: 'Process Invoice',
    status: 'Failure',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    duration: 5.2,
    input: { type: 'pdf', data: 'invoice_456.pdf', attachment: '/invoices/invoice_456.pdf' },
    output: { type: 'email', data: 'Failed to process invoice' },
    logs: 'INFO: Starting flow. \nINFO: Received PDF input. \nERROR: Could not parse PDF content. Invalid format. \nINFO: Sending failure notification email. \nINFO: Flow finished.'
  },
  {
    id: 'exec_003',
    flowName: 'Daily Report Generation',
    status: 'Success',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    duration: 45.8,
    input: { type: 'email', data: 'Subject: Run daily report' },
    output: { type: 'file', data: 'daily_report.csv', attachment: '/reports/daily_report.csv' },
    logs: 'INFO: Starting flow. \nINFO: Received email trigger. \nINFO: Fetching data from production DB. \nINFO: Aggregating results. \nINFO: Generating CSV file. \nSUCCESS: Report generated. \nINFO: Flow finished.'
  },
  {
    id: 'exec_004',
    flowName: 'Onboard New Client',
    status: 'Success',
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    duration: 11.9,
    input: { type: 'json', data: '{ "client": "Synergy Corp." }' },
    output: { type: 'database', data: 'User ID 124 created' },
    logs: 'INFO: Starting flow. \nINFO: Received JSON input. \nINFO: Creating user in database. \nSUCCESS: User created successfully. \nINFO: Flow finished.'
  },
  {
    id: 'exec_005',
    flowName: 'Process Invoice',
    status: 'Success',
    timestamp: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
    duration: 8.1,
    input: { type: 'pdf', data: 'invoice_789.pdf', attachment: '/invoices/invoice_789.pdf' },
    output: { type: 'database', data: 'Invoice 789 processed' },
    logs: 'INFO: Starting flow. \nINFO: Received PDF input. \nINFO: Parsing PDF content. \nINFO: Updating database record. \nSUCCESS: Invoice processed. \nINFO: Flow finished.'
  }
];

export const parameters: Parameter[] = [
  { id: 'param_01', key: 'MIN_INVOICE_AMOUNT', value: '100', description: 'Minimum amount to trigger high-value workflow.' },
  { id: 'param_02', key: 'ADMIN_EMAIL', value: 'admin@mytaskpanel.com', description: 'Email for critical error notifications.' },
  { id: 'param_03', key: 'CRM_API_KEY', value: '**********', description: 'API Key for the main CRM system.' },
  { id: 'param_04', key: 'WELCOME_EMAIL_SUBJECT', value: 'Welcome to MyTaskPanel!', description: 'Subject line for new user welcome emails.' }
];

export const users: User[] = [
  { id: 'user_01', name: 'Alice Johnson', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d', role: 'Administrator', status: 'Active' },
  { id: 'user_02', name: 'Bob Williams', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', role: 'Technician', status: 'Active' },
  { id: 'user_03', name: 'Charlie Brown', email: 'charlie@example.com', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d', role: 'Viewer', status: 'Active' },
  { id: 'user_04', name: 'Diana Prince', email: 'diana@example.com', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d', role: 'Technician', status: 'Locked' }
];
