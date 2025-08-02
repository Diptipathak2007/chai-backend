import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloduinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  //get the user details from the frontend
  //validation-not empty
  //check if the user already exists:username,email
  //check for images,check for avatar
  //upload the image to cloudinary,avatar
  //create user object-create entry in db
  //remove password and refreh token from the response because we don't want to send them back to the client
  //check for user creation
  //return response with the user details

  const{fullName,email,username,password}=req.body
  console.log('email:', email);
  if(
    [fullName, email, username, password].some((field)=>field?.trim() === "")
  ){
    throw new ApiError(400, "Full name is required");
  }

  const ExistedUser=User.findOne({
    $or: [{email}, {username}]
  })
  if(ExistedUser){
    throw new ApiError(409, "User already exists");
  }
  const avatarLocalPath=req.files?.avatar[0]?.path
  const coverImageLocalPath=req.files?.coverImage[0]?.path
  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar is required");
  }
  const avatar=await uploadOnCloduinary(avatarLocalPath)
  const coverImage=await uploadOnCloduinary(coverImageLocalPath)
  if(!avatar){
    throw new ApiError(500, "Avatar upload failed");
  }
  const user=await User.create({
    fullName,
    email,
    username:username.tolowerCase(),
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || null // coverImage is optional
  })
  const createduser=await User.findById(user._id).select('-password -refreshToken');

  if(!createduser){
    throw new ApiError(500, "User creation failed");
  }
  return res.status(201).json(
    new ApiResponse(200,createduser, "User created successfully")
  );


});

export { registerUser };
