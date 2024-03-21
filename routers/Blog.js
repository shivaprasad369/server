import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

// import About from './mongodb/models/About.js';
import BlogSchema from '../mogodb/model/Blogs.js'
dotenv.config();

const router = express.Router();

router.route('/').post(async(req,res)=>{
  console.log(req.body)
  try {
    
    const {name,id,photo,header,content} = req.body;
    
    // const data=await AboutSchema.findOneAndUpdate({nameId:id},{$inc:{name:req.body.name,photo:req.body.photo}})
    const data= new BlogSchema(req.body)
    await data.save()
    res.send({success:true,message:"stored data successfully",data})
  } catch (error) {
    console.log("not stored")
    res.send({success:false,message:"not stored",error:error})
  }
})

// router.route('/:id').delete(async(req,res)=>{
//     console.log(req.body)
//     try {
      
//       const {name,id,photo,header,content} = req.body;
      
//       // const data=await AboutSchema.findOneAndUpdate({nameId:id},{$inc:{name:req.body.name,photo:req.body.photo}})
//       const data= new BlogSchema(req.body)
//       await data.save()
//       res.send({success:true,message:"stored data successfully",data})
//     } catch (error) {
//       console.log("not stored")
//       res.send({success:false,message:"not stored",error:error})
//     }
//   })


router.route('/').get(async(req,res)=>{
 try {

   const data=await BlogSchema.find({})
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

router.route('/:id').delete(async(req,res)=>{
  try {
    
    const id=req.params.id;
    console.log(id);
    const data1=await BlogSchema.findOne({_id: new ObjectId(req.params.id)})
    if(data1){
    const data = await BlogSchema.deleteOne({_id: new ObjectId(req.params.id)})
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