import express, {Request, Response, NextFunction} from 'express';
import {CreateFreelancer, GetFreelancers, GetFreelancerById, CreateBusiness, GetBusinesses, GetBusinessById} from '../controllers';
const router = express.Router();

router.post('/business', CreateBusiness);
router.get('/businesses', GetBusinesses);
router.post('/business/:id', GetBusinessById);

router.post('/freelancer', CreateFreelancer);
router.get('/freelancers', GetFreelancers);
router.get('/freelancer/:id', GetFreelancerById);

export { router as AdminRoute};
