import mongoose, {Schema, Document, Model} from 'mongoose';

export interface FreelancerDoc extends Document{
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
  date: string;
}

const FreelancerSchema: Schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  userName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  salt: {type: String, required: true},
  linkedIn: {type: String, required: true},
  location: {type: String, required: true},
  age: {type: String, required: true},
  description: {type: String, required: true},
  icon: {type: String},
  date: {type: Date, default: Date.now() }
})

const Freelancer = mongoose.model<FreelancerDoc>('freelancer', FreelancerSchema);

export { Freelancer };
