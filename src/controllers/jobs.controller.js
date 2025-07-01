import JobModel from '../models/jobs.model.js';
import ApplicantModel from '../models/applicants.model.js';
class JobsController {
  getJobs(req, res, next) {
    var jobs = JobModel.getAll();
   return res.render('list-all-jobs', { jobs});
  }

  getAddJob(req, res, next) {
    res.render('new-job', {
      errorMessage: null,
      user:req.session.user
    });
  }

  postAddJob(req, res, next) {
    const {  
        job_category,
        job_designation,
        job_location,
        company_name,
        salary,
        apply_by,
        skills_required,
        number_of_openings,
        job_posted,
        applicants}=req.body;
   
    const logo='images/'+req.file.filename; 
    JobModel.add( 
        job_category,
        job_designation,
        job_location,
        company_name,
        salary,
        apply_by,
        skills_required,
        number_of_openings,
        job_posted,
        applicants,logo);
    var jobs = JobModel.getAll();
    res.render('list-all-jobs', { jobs,user:req.session.user });
  }
  getJobView(req,res,next){
    const id=req.params.id;
    const jobFound=JobModel.getById(id);
    //console.log(req.session.user)
    if(jobFound){
      res.render('job-details',{data:jobFound,errorMessage:null,user:req.session.user})
    }else{
      res.status(401).send('Job not found')
    }
  }

  getUpdatedJob(req,res,next){
    //1. if product existthen return value
    const id=req.params.id;
    const jobFound=JobModel.getById(id)
    if(jobFound){
      res.render('update-job',{job:jobFound,errorMessage:null,user:req.session.user})
    }
    //2.else return error
    else{
      res.status(401).send('Job not found')
    }
  }
  postUpdateJob(req,res,next){
      const id=req.params.id;
    JobModel.update(req.body,id);
   var jobs = JobModel.getAll();
    const jobFound=JobModel.getById(id);
    res.render('job-details',{data:jobFound,errorMessage:null,user:req.session.user})
  
  }

  deleteJob(req,res){
    let id=req.params.id;
    const jobFound=JobModel.getById(id)
    if(!jobFound){
      return  res.status(401).send('Job not found')
    }
    JobModel.delete(id);
     var jobs = JobModel.getAll();
       res.render('list-all-jobs', { jobs,user:req.session.user });
  }
  //apply/:id

 applyByJobSeeker(req,res){
     let id=req.params.id;
    const jobFound=JobModel.getById(id);
    if(!jobFound){
      return  res.status(401).send('Job not found')
    }
    JobModel.applyBy(id);
    const {name,email,contact}=req.body;
    const resumePath=req.file.filename; 
     console.log(resumePath)
     ApplicantModel.add(name,email,contact,resumePath);
    var jobs = JobModel.getAll();
    res.render('list-all-jobs', { jobs });
  }
  getJobApplicants(req,res){
    var applicants = ApplicantModel.getAllApplicants();
   return res.render('all-applicants', { allApplicants:applicants,user:req.session.user});
  }

}

export default JobsController;
