import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import {auth} from './src/middleware/auth.middleware.js';
import UserController from './src/controllers/user.controller.js';

import JobsController from './src/controllers/jobs.controller.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middleware/lastVisit.middleware.js';
const app=express();

app.use(cookieParser())
app.use(setLastVisit)
//session
app.use(session({
  secret:'SecretKey',
  resave:false,
  saveUninitialized:true,
  cookie:{secure:false}//http: false https:true for security
}))
app.use(express.static('public'));
//creating an instance
const userController=new UserController();
const jobsController=new JobsController()
app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set(
  'views',
  path.join(path.resolve(), 'src', 'views')
);
//landing page
app.get('/',(req,res)=>{
    res.render('landing-page')
})

app.set('layout', 'layouts/layout');
//User Controler
app.get('/register',userController.getRegister);
app.get('/login',userController.getLogin);

app.get('/signup',userController.getRegister)
app.post('/register',userController.postRegister);

app.post('/login',userController.postLogin);

app.get('/logout',userController.logout);
//Jobs Controller

app.get('/jobs',jobsController.getJobs);
app.get('/postjob',jobsController.getAddJob);
// app.get('/jobs/:id',userController.getLogin);
// app.put('/jobs/:id',userController.getLogin);
// app.delete('/jobs/:id',userController.getLogin);
//Error page or any other routes
app.use((req,res)=>{
    res.render('404');
});



//app.set('views',__dirname,'src','views');

//Job Controller and routes
app.get('/jobs',jobsController.getJobs)


const PORT=3200;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})