import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

// import About from './mongodb/models/About.js';
import AboutSchema from '../mogodb/model/About.js'
dotenv.config();

const router = express.Router();

router.route('/').post(async(req,res)=>{
  console.log(req.body)
  try {
    
    const {name,nameId,photo}=req.body;
    
    // const data=await AboutSchema.findOneAndUpdate({nameId:id},{$inc:{name:req.body.name,photo:req.body.photo}})
    const fil=await AboutSchema.findOne({nameId})
    
    if(fil){
      res.send({message:'image already exists'})
      return false;
    }
    const data= new AboutSchema(req.body)
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
   const data=await AboutSchema.findOne({nameId:id})
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
    const data1=await AboutSchema.findOne({nameId:id})
    if(data1){
    const data = await AboutSchema.deleteOne({nameId:id})
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