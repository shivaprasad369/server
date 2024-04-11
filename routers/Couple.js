import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path'
import multer from 'multer'
// import About from './mongodb/models/About.js';
import CoupleSchema from '../mogodb/model/Couple.js'
dotenv.config();

const router = express.Router();
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../saaj/src/image/')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() 
//     cb(null, file.fieldname + '_' + uniqueSuffix + path.extname(file.originalname))
//   }
// })

// const upload = multer({ storage: storage })
cloudinary.config({ 
  cloud_name: 'dlcgfrsws', 
  api_key: '471727215737517', 
  api_secret: 'vzIt3W3Q1Zqy_q0xd6iKdvhCBZA' 
});
router.route('/').post(async(req,res)=>{
  console.log(req.file)
  try {
    
    const {name,nameId,photo,desc,link}=req.body;
    
    // const data=await CoupleSchema.findOneAndUpdate({nameId:id},{$inc:{name:req.body.name,photo:req.body.photo}})
    const fil=await CoupleSchema.findOne({nameId:nameId})
    
    if(fil){
      res.send({message:'image already exists'})
    
      return false;
    }
    const photoUrl=(await cloudinary.uploader.upload(photo,{folder:'couple'})).secure_url
    const data= new CoupleSchema({photo:photoUrl,name:name,nameId:nameId,desc:desc,link:link})
    await data.save()
    res.send({success:true,message:"stored data successfully",data})
  } catch (error) {
    console.log("Please provide proper image formate and also check image size")
    res.send({success:false,message:"Please provide proper image formate and also check image size"})
  }
})

router.route('/:id').get(async(req,res)=>{
  try {
   const id= req.params.id;
    const data=await CoupleSchema.findOne({nameId:id})
    if(data){
      res.status(200).json({ success: true, data: data });
      console.log(data)
 
    }
    else{
     res.status(200).json({ success: false, data: "there is no data present" });
    }
  } catch (error) {
   res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
   
 })
 

router.route('/').get(async(req,res)=>{
 try {
  const id= req.params.id;
   const data=await CoupleSchema.find({})
   if(data){
     res.status(200).json({ success: true, data: data });
     console.log(data)

   }
   else{
    res.status(200).json({ success: false, data: "there is no data present" });
   }
 } catch (error) {
  res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
 }
  
})

router.route('/delete/:id').delete(async(req,res)=>{
  try {
    
    const id=req.params.id;
    console.log(id);
    const data1=await CoupleSchema.findOne({nameId:id})
    if(data1){
    const data = await CoupleSchema.deleteOne({nameId:id})
    if(data){
      res.send({Success:true,message:"Deleted data successfully",data})
    }}else{
      res.send({Success:false,message:"No data found"})
    }
  } catch (error) {
    console.log("delete not appand")
    res.send({Success:false,message:"No data found"})
  }
})
export default router