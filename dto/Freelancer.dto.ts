export interface FreelancerProfileInputs{
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  salt: string;
  linkedIn: string;
  location: string;
  age: number;
  description: string;
  icon: string;
}

export interface FreelancerLoginInputs{
  email: string;
  password: string;
}

export interface FreelancerPayload{
  _id: string;
  email: string;
}

export type SocialType = {
  youtube?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
}

export type ProfileType = {
 freelancer?: any;
  company?: string;
  website?: string;
  student?: string;
  status?: string;
  githubUsername?: string;
  skills?: [string];
  social?: SocialType;
}
