export const setLastVisit=(req,res,next)=>{
    //1. if cookies is set , then add  a local variable with last visit time data.
    if(req.cookies.lastVisit){
      //  console.log(req.cookies.lastVisit)
        res.locals.lastVisit=new Date(
            req.cookies.lastVisit
        ).toLocaleString();
    }
    res.cookie('lastVisit',new Date().toISOString(),{
        maxAge:2*24*60*60*1000,
    });
    next();
}