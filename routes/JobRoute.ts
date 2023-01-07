import express from 'express';
import {CreateJob} from '../controllers';
import {Authenticate} from '../middleware';
const router = express.Router();
router.post('/createjob', Authenticate, CreateJob);
export { router as JobRoute};
