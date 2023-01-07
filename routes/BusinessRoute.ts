import express from 'express';
import {BusinessLogin, CreateBusinessProfile, CreateJob} from '../controllers';
import {Authenticate} from '../middleware';
const router = express.Router();
router.post('/login', BusinessLogin);
router.post('/createprofile', Authenticate, CreateBusinessProfile);
router.post('/createjob', Authenticate, CreateJob);
export { router as BusinessRoute};
