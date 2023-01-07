import {Request, Response, NextFunction} from 'express';
import {FreelancerLoginInputs, ProfileType} from '../dto';
import {FindFreelancer} from './AdminController';
import {FreelancerProfile} from '../models';
import {GenerateSignature, ValidatePassword} from '../utility';

export const FreelancerLogin = async(req:Request, res:Response, next: NextFunction) =>{
  const {email, password} = <FreelancerLoginInputs>req.body;
  const existingFreelancer = await FindFreelancer('', email);

  if(existingFreelancer !== null){
    const validation = await ValidatePassword(password, existingFreelancer.password, existingFreelancer.salt);
    if(validation){
      const signature = GenerateSignature({
       _id: existingFreelancer._id,
       email: existingFreelancer.email
      })

      return res.status(200).json({
        signature: signature
      }) 
    }
    else{
      return res.status(403).json({message:"Password is not valid"})
    }
  }
  return res.status(404).json({message:"Login credentials not failed"})
}

export const CreateFreelancerProfile = async(req: Request | any, res:Response, next: NextFunction)=>{
 
  const {company, website, student, status, githubUsername, youtube, twitter, facebook, instagram, skills} = req.body as any;
  const user = req.user;
  const fields: ProfileType = {};
  
  fields.freelancer = user._id;
  if(company) fields.company = company;
  if(website) fields.website = website;
  if(student) fields.student = student;
  if(status) fields.status = status;
  if(githubUsername) fields.githubUsername = githubUsername;
  if(skills){
    const result = skills.split(',').map((skill: any)=>{
     return skill.trim();
    })
    fields.skills = result;
  }
  fields.social = {} ;
  if(youtube) fields.social.youtube = youtube;
  if(twitter) fields.social.twitter = twitter;
  if(instagram) fields.social.instagram = instagram;
  if(facebook) fields.social.facebook = facebook;
  try{
  const profile = await FreelancerProfile.findOne({freelancer:user._id});
  if(profile){
    const updatedProfile = await FreelancerProfile.findOneAndUpdate(
      {freelancer: user._id},
      {$set: fields},
      {new: true}
    );
  return res.json(updatedProfile)
  }
  const newProfile = await FreelancerProfile.create(fields);
  return res.json(newProfile);
  }
  catch(err){
    res.status(500).send("Server Error")
  }
}

export const GetFreelancerProfile = async(req:Request | any, res:Response, next:NextFunction)=>{

  try{
      const freelancerProfile = await FreelancerProfile.findOne({freelancer: req.params.freelancer_id}).populate('freelancer',['userName','firstName','lastName','email','description','linkedIn','location']);         
      if(freelancerProfile !== null){
        return res.status(200).json(freelancerProfile)
      } 
      else{
        return res.status(400).json({message:"Profile not found"})
      }
    }
    catch(err){
      res.status(500).json(err);
    }  
}

export const GetIndFreelancerProfile = async(req:Request | any, res:Response, next:NextFunction)=>{
 const user = req.user;
 if(user){ 
 try{
      const freelancerProfile = await FreelancerProfile.findOne({freelancer: user._id}).populate('freelancer',['userName','firstName','lastName','email','description','linkedIn','location']);         
      if(freelancerProfile !== null){
        return res.status(200).json(freelancerProfile)
      } 
      else{
        return res.status(400).json({message:"Profile not found"})
      }
    }
    catch(err){
      res.status(500).json(err);
    }  
 }
 else{
   res.status(400).json("Authentication failed")
 }
}
