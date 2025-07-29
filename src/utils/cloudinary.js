import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloduinary = async (localfilePath) => {
    try {
        if(!localfilePath){
            throw new Error("No file path provided for upload");
        }
        //upload the file on cloudinary
        const response=await cloudinary.uploader.upload(localfilePath,{
            resource_type: "auto", // automatically detect resource type (image/video)
        })
        //file has been uploaded succesfully
        console.log("File uploaded successfully to Cloudinary",response.url);
        return response
    } catch (error) {
        //handle error
        fs.unlinkSync(localfilePath) //remove the locally saved temporary file as the upload operation failed
        return null;
    }
};

export { uploadOnCloduinary };
