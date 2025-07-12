export type Execution = {
  id: string;
  flow_name: string;
  status: 'Success' | 'Failure';
  timestamp: string;
  duration: number;
  input_type: 'email' | 'pdf' | 'json' | 'database' | 'file' | 'text';
  input_data: string;
  input_attachment?: string;
  output_type: 'email' | 'pdf' | 'json' | 'database' | 'file' | 'text';
  output_data: string;
  output_attachment?: string;
  logs: string;
};

export type Parameter = {
  id: string;
  key: string;
  value: string;
  description: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Administrator' | 'Viewer' | 'Technician';
  status: 'Active' | 'Locked' | 'Invited';
};
