import UserModel from '../models/user.model.js';
import JobModel from '../models/jobs.model.js';
export default class UserController{
    getRegister(req,res){
        res.render('user-register')
    }
    getLogin(req,res){
        res.render('user-login',{errorMessage:null})
    }
    postRegister(req,res){
        const {name,email,password}=req.body;
        UserModel.add(name,email,password);
        req.session.userName=name;
        res.render('user-login',{errorMessage:null});
    }
    postLogin(req,res){
        const {email,password}=req.body;
       const user= UserModel.isValidUser(email,password);
       if(!user){
       return res.render('user-login',{
            errorMessage:"Invalid Credentials"
        })
       }
     //  console.log(req.session.userName)
       req.session.user=user;
           var jobs =JobModel.getAll();
          return  res.render('list-all-jobs', { jobs,user:req.session.user});
     
    }
    logout(req,res){
        //on logout,destroy the session
        req.session.destroy((err)=>{
            if(err){
              //  console.log(err)
            }else{
                res.redirect('/login')
            }
        });
        res.clearCookie('lastVisit');
    }
}