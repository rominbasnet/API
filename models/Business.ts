import mongoose, {Schema, Document, Model} from 'mongoose';

interface BusinessDoc extends Document{
  companyName: string;
  contactName: string;
  contactEmail: string;
  password: string;
  salt: string;
  location: string;
  companyDescription: string;
  date: string;
}

const BusinessSchema: Schema = new Schema({
  companyName: {type: String, required: true},
  contactName: {type: String, required: true},
  contactEmail: {type: String, required: true},
  password: {type: String, required: true},
  salt: {type: String, required: true},
  location: {type: String, required: true},
  companyDescription: {type: String, required: true},
  date: {type: Date, default: Date.now()}
});

const Business = mongoose.model<BusinessDoc>('business', BusinessSchema); 

export { Business };


