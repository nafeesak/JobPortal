import { application } from "express";

export default class JobModel{
   constructor(
        id,
        job_category,
        job_designation,
        job_location,
        company_name,
        salary,
        apply_by,
        skills_required,
        number_of_openings,
        job_posted,
        applicants,
        logo
    ) {
        this.id = id;
        this.job_category = job_category;
        this.job_designation = job_designation;
        this.job_location = job_location;
        this.company_name = company_name;
        this.salary = salary;
        this.apply_by = apply_by;
        this.skills_required = skills_required;
        this.number_of_openings = number_of_openings;
        this.job_posted = job_posted;
        this.applicants = applicants;
        this.logo=logo;

    }
    
  static getAll() {
    return jobs;
  }
  static add(job_category,
        job_designation,
        job_location,
        company_name,
        salary,
        apply_by,
        skills_required,
        number_of_openings,
        job_posted,
        applicants,
    logo){
     let newJob = new JobModel(
      jobs.length + 1,
        job_category,
        job_designation,
        job_location,
        company_name,
        salary,
        apply_by,
        skills_required,
        number_of_openings,
        job_posted,
        applicants,
        logo
    );
    jobs.push(newJob);
  }
  static getById(id){
    return jobs.find((p)=>p.id==id)
  }
  static update(jobObj,id){
   // console.log(jobObj)
     const index=jobs.findIndex((p)=>p.id==id);
       jobs[index] = { ...jobs[index], ...jobObj };
  }
static delete(id){
  const index=jobs.findIndex((p)=>p.id==id);
  jobs.splice(index,1)
}
static applyBy(id){
  const index=jobs.findIndex((p)=>p.id==id);
  jobs[index]={ ...jobs[index],  applicants: jobs[index].applicants + 1 };
}
}
let jobs=[
    new JobModel(
            1,
            'IT',
            'Software Engineer',
            'Bangalore',
            'Tech Solutions Inc.',
            800000, // salary in INR (example)
            new Date('2025-07-31'),
            ['JavaScript', 'Node.js', 'React', 'MongoDB'],
            5,
            new Date('2025-06-01'),
           [1,2],
            'https://searchengineland.com/wp-content/seloads/2015/12/google-amp-fast-speed-travel-ss-1920.jpg',
        ),
        new JobModel(
            2,
            'Marketing',
            'Digital Marketing Specialist',
            'Mumbai',
            'Global Brands Ltd.',
            650000,
            new Date('2025-08-15'),
            ['SEO', 'SEM', 'Content Marketing', 'Social Media'],
            2,
            new Date('2025-06-10'),
            [1],
            'https://searchengineland.com/wp-content/seloads/2015/12/google-amp-fast-speed-travel-ss-1920.jpg',
        ),
        
        new JobModel(
            3,
            'Finance',
            'Financial Analyst',
            'Delhi',
            'Wealth Management Corp.',
            750000,
            new Date('2025-07-20'),
            ['Financial Modeling', 'Excel', 'Data Analysis'],
            3,
            new Date('2025-05-25'),
            [1,2,3],
             'https://searchengineland.com/wp-content/seloads/2015/12/google-amp-fast-speed-travel-ss-1920.jpg'
        
        ),
        new JobModel(
            4,
            'IT',
            'UI/UX Designer',
            'Remote',
            'Creative Designs LLC',
            700000,
            new Date('2025-08-05'),
            ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
            1,
            new Date('2025-06-05'),
            [1,2],
            'https://searchengineland.com/wp-content/seloads/2015/12/google-amp-fast-speed-travel-ss-1920.jpg'
        ),
        new JobModel(
            5,
            'Healthcare',
            'Registered Nurse',
            'Pune',
            'City Hospital',
            550000,
            new Date('2025-07-25'),
            ['Patient Care', 'Medication Administration', 'Emergency Response'],
            10,
            new Date('2025-06-15'),
            [1,2],
            'https://searchengineland.com/wp-content/seloads/2015/12/google-amp-fast-speed-travel-ss-1920.jpg'
        ),

]