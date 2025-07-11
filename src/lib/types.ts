export type Execution = {
  id: string;
  flowName: string;
  status: 'Success' | 'Failure';
  timestamp: string;
  duration: number;
  input: {
    type: 'email' | 'pdf' | 'json';
    data: string;
    attachment?: string;
  };
  output: {
    type: 'email' | 'database' | 'file';
    data: string;
    attachment?: string;
  };
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
  status: 'Active' | 'Locked';
};
