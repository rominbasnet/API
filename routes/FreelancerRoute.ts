import express from 'express';
import {FreelancerLogin, CreateFreelancerProfile, GetFreelancerProfile} from '../controllers';
import {Authenticate} from '../middleware';
const router = express.Router();
router.post('/login', FreelancerLogin);
router.post('/createprofile', Authenticate, CreateFreelancerProfile);
router.get('/profile', Authenticate, GetFreelancerProfile);
export { router as FreelancerRoute};
