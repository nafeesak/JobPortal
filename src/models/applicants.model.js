export default class ApplicantModel{
    constructor(ApplicantId,name,email,contact,resumePath){
        this.id=ApplicantId;
        this.name=name;
        this.email=email;
        this.contact=contact;
        this.resumePath=resumePath;
    }
    static add(name,email,contact,resumePath){
        const newApplicant=new ApplicantModel(applicants.length+1,name,email,contact,resumePath);
        applicants.push(newApplicant);
    }
}
let applicants=[]