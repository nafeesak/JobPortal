import JobModel from '../models/jobs.model.js';

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
   // console.log(req.file.filename);
    const imageUrl='images/'+req.file.filename; 
    JobModel.add( job_category,
        job_designation,
        job_location,
        company_name,
        salary,
        apply_by,
        skills_required,
        number_of_openings,
        job_posted,
        applicants,imageUrl);
    var jobs = JobModel.getAll();
    console.log(req.session.user)
    res.render('list-all-jobs', { products,user:req.session.user });
  }

//   getUpdatedProductView(req,res,next){
//     //1. if product existthen return value
//     const id=req.params.id;
//     //console.log(id)
//     const productFound=ProductModel.getById(id)
//     if(productFound){
//       res.render('update-product',{product:productFound,errorMessage:null,user:req.session.user})
//     }
//     //2.else return error
//     else{
//       res.status(401).send('Product not found')
//     }
//   }
//   postUpdateProduct(req,res,next){
//      ProductModel.update(req.body);
//     var products = ProductModel.getAll();
//     res.render('index', { products,user:req.session.user });
  
//   }
//   deleteProduct(req,res){
//     let id=req.params.id;
//     const productFound=ProductModel.getById(id)
//     if(!productFound){
//       return  res.status(401).send('Product not found')
//     }
//     ProductModel.delete(id);
//      var products = ProductModel.getAll();
//        res.render('index', { products,user:req.session.user });
//   }
}

export default JobsController;
