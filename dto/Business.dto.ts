export interface BusinessRegisterInputs{
  companyName: string;
  contactName: string;
  contactEmail: string;
  password: string;
  salt: string;
  location: string;
  companyDescription: string;
  date: string;
}

export interface BusinessLoginInputs{
  email: string;
  password: string;
}

export interface BusinessProfileInputs{
  status: string;
  website: string;
  established: number;
  companyCategory: string;
  employeeCount: number;
  clients: string;
}

export type BusinessProfileType = {
  business?: any;
  status?: string;
  website?: string;
  established?: number;
  companyCategory?: string;
  employeeCount?: number;
  clients?: any;
}
