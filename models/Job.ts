import mongoose, {Schema, Document, Model} from 'mongoose';

interface Interested extends Document{
  user: any;
  firstName: string;
  email: string;
  linkedIn: string;
  location: string;
  description: string;
  skills: [string];
}

interface JobDoc extends Document{
  business: any;
  freelancerProfile: any;
  jobTitle: string;
  jobDescription: string;
  skillSetReq: [string];
  jobBudget: number;
  jobDuration: number;
  interested: [Interested];
  date: string;
}

const JobSchema = new mongoose.Schema({
  business: {type: mongoose.Schema.Types.ObjectId, ref: 'business'},
  freelancerProfile: {type: mongoose.Schema.Types.ObjectId, ref:'freelancerprofile'},
  jobTitle: {type: String, required: true},
  jobDescription: {type: String, required: true},
  skillSetReq: {type: [String], required: true},
  jobBudget: {type: Number, required: true},
  jobDuration: {type: Number, required: true},
  interested: [
    {
      user: {type: mongoose.Schema.Types.ObjectId, ref: 'freelancer'},
      firstName: {type: String},
      email: {type: String},
      linkedIn: {type: String},
      location: {type: String},
      description: {type: String},
      skills: {type: [String]}
    }
  ]
})

const Job = mongoose.model<JobDoc>('job',JobSchema);

export { Job };

