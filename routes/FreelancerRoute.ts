import express from 'express';
import {FreelancerLogin, CreateFreelancerProfile, GetFreelancerProfile, GetIndFreelancerProfile} from '../controllers';
import {Authenticate} from '../middleware';
const router = express.Router();
router.post('/login', FreelancerLogin);
router.post('/createprofile', Authenticate, CreateFreelancerProfile);
router.get('/profile/individual', Authenticate, GetIndFreelancerProfile);
router.get('/profile/:freelancer_id', GetFreelancerProfile);
export { router as FreelancerRoute};
