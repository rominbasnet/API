import mongoose, {Schema, Document, Model} from 'mongoose';

interface BusinessProfileDoc extends Document{
  business: any;
  website: string;
  status: string;
  employeeCount: number;
  established: number;
  clients: [string];
  companyCategory: string;
}

const BusinessProfileSchema: Schema = new Schema({
  business: {type: mongoose.Schema.Types.ObjectId, ref: 'business'},
  website: {type: String, required: true},
  status: {type: String, required: true},
  employeeCount: {type: Number},
  established: {type: Number, required: true},
  clients: {type: [String], required: true},
  companyCategory: {type: String, required: true}
})

const BusinessProfile = mongoose.model<BusinessProfileDoc>('businessprofile', BusinessProfileSchema);

export { BusinessProfile };

