import multer from 'multer'
import path from 'path'; 
//image upload
const storageConfig=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images');
    },
    filename:(req,file,cb)=>{
        const name=Date.now()+'-'+file.originalname;
        cb(null,name)
    }
})
export const uploadFile=multer({
    storage:storageConfig,
})
//pdf or word upload
const storageConfigPdf = multer.diskStorage({
    // Set the destination directory for uploaded files
    // You should create this directory if it doesn't exist (e.g., 'public/documents')
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); 
    },
    // Define the filename for the uploaded file
    filename: (req, file, cb) => {
         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname); // Get original file extension
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
});

// Configure Multer for file uploads
export const uploadDocument = multer({
    storage: storageConfigPdf,
    // Optional: Add a fileFilter to allow only specific document types
    fileFilter: (req, file, cb) => {
        // Allowed file extensions
        const allowedExtensions = ['.pdf'];
        // Get the file's extension
        const fileExtension = path.extname(file.originalname).toLowerCase();

        // Check if the file extension is in the allowed list
        if (allowedExtensions.includes(fileExtension)) {
            // Accept the file
            cb(null, true);
        } else {
            // Reject the file and provide an error message
            cb(new Error('Only PDF documents are allowed!'), false);
        }
    },
    // Optional: Set file size limits (e.g., 5MB)
    // You might want to adjust this based on your needs
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
});