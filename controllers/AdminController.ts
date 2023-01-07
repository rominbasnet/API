import express, {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose'; 
import {GeneratePassword, GenerateSalt} from '../utility';
import {Business} from '../models';
import {Freelancer} from '../models';
import {BusinessRegisterInputs, FreelancerProfileInputs} from '../dto';

const router = express.Router();

export const FindFreelancer = async(id: string| undefined, email?: string)=>{
  if(email){
    return await Freelancer.findOne({email: email});
  }
  else{
    return await Freelancer.findById(id)
  }
}

export const FindBusiness = async(id: string| undefined, email?: string)=>{
  if(email){
    return await Business.findOne({contactEmail: email});
  }
  else{
    return await Business.findById(id)
  }
}

export const FindFreelancerByUsername = async(username: string)=>{
  return await Freelancer.findOne({userName: username})
}

export const CreateFreelancer = async(req:any, res:Response, next:NextFunction)=>{
 const {firstName, lastName, userName, email, password, linkedIn, location, age, description, icon} = <FreelancerProfileInputs>req.body;
  const existingFreelancer = await FindFreelancer('', email);
  if(existingFreelancer !== null){
    return res.json({"messsage":"A freelancer exist with this email id"})
  }
  
  const existingFreelancerByUsername = await FindFreelancerByUsername(userName);
  if(existingFreelancerByUsername !== null){
     return res.json({"message":"A freelancer exist with this username"});
  }
  try{
  const salt = await GenerateSalt();
  const userPassword = await GeneratePassword(password, salt);

  const createdFreelancer = await Freelancer.create({
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    email: email,
    password: userPassword,
    salt: salt,
    linkedIn: linkedIn,
    location: location,
    age: age,
    description: description,
    icon: icon
  })

  res.json(createdFreelancer);

  }catch(err){
     res.status(500).json(err)
  }
}

export const GetFreelancers = async(req:Request, res: Response, next: NextFunction)=>{
  const freelancers = await Freelancer.find(); //freelancers is an array

  if(freelancers !== null){
    return res.json(freelancers);
  }
  return res.json({message:"Freelancer detail not available"})
}

export const GetFreelancerById= async(req:Request, res:Response, next:NextFunction)=>{
  const freelancerId = req.params.id;
  if (mongoose.isValidObjectId(freelancerId)){
    const freelancer = await FindFreelancer(freelancerId);
    if (freelancer !== null){
      return res.json(freelancer)
    }
    else{
      return res.json({message:"Freelancer data not available"})
    }
  }
  else return res.json({message:"Invalid ID"})
}

export const CreateBusiness = async (req: Request, res: Response, next: NextFunction)=>{
  const {companyName, contactName, contactEmail, password, location, companyDescription} = <BusinessRegisterInputs>req.body;   
  const existingBusiness = await FindBusiness('', contactEmail);
    if(existingBusiness){
     return res.status(400).json({message:"Business already exists"});
    }
    try{
      const salt = await GenerateSalt();
      const userPassword = await GeneratePassword(password, salt);
      const createdBusiness = await Business.create({
        companyName: companyName,
        contactName: contactName,
        contactEmail: contactEmail,
        password: userPassword,
        salt: salt,
        location: location,
        companyDescription: companyDescription
    });
    res.json(createdBusiness);
    
  }catch(err){
    res.status(500).json(err);
  }
}

export const GetBusinesses = async(req: Request, res: Response, next: NextFunction)=>{
  const businesses = await Business.find(); //businesses is an array
  if(businesses!==null){
    return res.json(businesses);
  }
  return res.json({"message":"Business detail not available"})
}

export const GetBusinessById = async(req: Request, res: Response, next: NextFunction)=>{
  const businessId = req.params.id;
  if(mongoose.isValidObjectId(businessId)){
    const business = await FindBusiness(businessId);
    if (business !== null){
      return res.json(business);
    }
    else{
      return res.json({message:"Business data not available"});
    }
  }
  else return res.json({message:"Invalid ID"})
}
