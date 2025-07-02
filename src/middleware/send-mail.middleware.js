import nodemailer from 'nodemailer';

export default async function sendMail(toAddress){

// 1. Create an email transporter.
// SMTP (Simple Mail Transfer Protocol)
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'senderemail',
        pass:'password'
    }
});

//2. Configure email content
const mailOptions = {
    from: 'senderemail',
    to: toAddress,
    subject: 'Welcome to Job portal',
    text: 'Thanks for applying for this job',
};

// 3. Send the email
try{
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
}catch(err){
    console.log('Email send failer with error: '+ err);
}
}

