import express, {Request, Response, NextFunction, Application} from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import {AdminRoute, FreelancerRoute, BusinessRoute, JobRoute} from './routes';
import {MONGO_URI} from './config';
const app: Application = express();
const PORT = 8000 || process.env.port;
app.use(cors());
mongoose.set('strictQuery', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/admin', AdminRoute);
app.use('/freelancer', FreelancerRoute);
app.use('/business', BusinessRoute);
app.use('/job', JobRoute);

mongoose.connect(MONGO_URI)
  .then(respond=>{
    console.log("Database is working")
  })
  .catch(err=>{
    console.log(err)
  })
  
app.listen(PORT,()=>{
  console.log(`App listening on port ${PORT}`);
})
