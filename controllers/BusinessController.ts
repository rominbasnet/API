import {Request, Response, NextFunction} from 'express';
import {BusinessLoginInputs, BusinessProfileInputs, BusinessProfileType} from '../dto';
import {FindBusiness} from './AdminController';
import {BusinessProfile} from '../models';
import {GenerateSignature, ValidatePassword} from '../utility';

export const BusinessLogin = async(req:Request, res:Response, next: NextFunction) =>{
  const {email, password} = <BusinessLoginInputs>req.body;
  const existingBusiness = await FindBusiness('', email);

  if(existingBusiness !== null){
    const validation = await ValidatePassword(password, existingBusiness.password, existingBusiness.salt);
    if(validation){
      const signature = GenerateSignature({
       _id: existingBusiness._id,
       email: existingBusiness.contactEmail
      })

      return res.status(200).json({
        signature: signature
      }) 
    }
    else{
      return res.status(403).json({message:"Password is not valid"})
    }
  }
  return res.status(404).json({message:"Login credentials not valid"})
}

export const CreateBusinessProfile = async(req: Request | any, res:Response, next: NextFunction)=>{
 
  const { status, website, established, companyCategory, employeeCount, clients } = <BusinessProfileInputs>req.body;
  const user = req.user;
  const fields: BusinessProfileType = {};
  
  fields.business = user._id;
  if(established) fields.established = established;
  if(website) fields.website = website;
  if(clients) fields.clients = clients;
  if(status) fields.status = status;
  if(companyCategory) fields.companyCategory = companyCategory;
  if(clients){
    const result = clients.split(',').map((client: any)=>{
     return client.trim();
    })  
    fields.clients = result;
  }
  
  try{
  const profile = await BusinessProfile.findOne({business:user._id});
  if(profile){
    const updatedProfile = await BusinessProfile.findOneAndUpdate(
      {business: user._id},
      {$set: fields},
      {new: true}
    );
  return res.json(updatedProfile)
  }
  const newProfile = await BusinessProfile.create(fields);
  return res.json(newProfile);
  }
  catch(err){
    res.status(500).send("Server Error")
  }
}

