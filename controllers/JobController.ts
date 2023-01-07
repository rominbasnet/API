import {Request, Response, NextFunction} from 'express';
import {Freelancer, FreelancerProfile, Business, Job} from '../models';
import {CreateJobInputs} from '../dto/';

export const CreateJob = async (req:Request | any, res:Response, next: NextFunction)=>{
  
  const user = req.user;
  const {jobTitle, jobDescription, jobDuration, jobBudget, skillSetReq} = <CreateJobInputs>req.body;
  if(user){
    
    try{      
      const business: any = await Business.findById(user._id);
      const newSkillSetReq = skillSetReq.split(',').map((skill: any) =>{
        return skill.trim(); 
        })
      const createdJob = await Job.create({
        business: user._id,
        companyName: business.companyName,
        location: business.location,
        jobTitle: jobTitle,
        skillSetReq: newSkillSetReq,
        jobDescription: jobDescription,
        jobDuration: jobDuration,
        jobBudget: jobBudget
      }) 
      
      return res.json(createdJob);
    }catch(err){
      return res.status(500).json({ msg:err }) 
    }    
  }
  else{
    return res.status(400).json({msg:"Business Not Validated"})
  }
}            
