import mongoose, {Schema, Document, Model} from 'mongoose';

export interface Experience extends Document{
  title: string;
  company: string;
  location: string;
  from: string;
  to: string;
  current: string;
  description: string;
}

export interface Education extends Document{
  courseOfStudy: string;
  university: string;
  location: string;
  from : string;
  to: string;
  description: string;
}

export interface Social extends Document{
  youtube: string;
  twitter: string;
  facebook: string;
  instagram: string;
}

export interface FreelancerProfileDoc extends Document{
  freelancer: any;
  company: string;
  website: string;
  status: string;
  githubUsername: string;
  skills: [string];
  student: boolean;
  experience: [Experience];
  education: [Education];
  social: Social;
  date: string;

}

const FreelancerProfileSchema: Schema = new Schema({
  freelancer: {type: mongoose.Schema.Types.ObjectId, ref: 'freelancer'},
  company: {type: String},
  website: {type: String},
  status: {type: String, required: true},
  githubUsername: {type: String},
  skills: {type: [String], required: true},
  student: {type: Boolean, default: false},
  experience: [
    {
      title: {type: String, required: true},
      company: {type: String, required: true},
      location: {type: String, required: true},
      from: {type: String, required: true},
      to: {type: String, required: true},
      current: {type: String, required: true},
      description: {type: String}
    }
  ],
  education: [
    {
      courseOfStudy: {type: String, required: true},
      university: {type: String, required: true},
      location: {type: String},
      from: {type: Date, required: true},
      to: {type: Date, required: true},
      description: {type: String}
    }
  ],
  social: {
    youtube: {type: String},
    twitter: {type: String},
    facebook: {type: String},
    instagram: {type: String}
  },
  date: {type: Date, default: Date.now()}
})

const FreelancerProfile = mongoose.model<FreelancerProfileDoc>('freelancerprofile', FreelancerProfileSchema);

export { FreelancerProfile };
