import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './mogodb/connect.js';
import mongoose from 'mongoose';
import AboutRouter from './routers/About.js';
import BlogRouter from './routers/Blog.js';
import ServiceRouter from './routers/Service.js';
import CoupleRouter from './routers/Couple.js';
import OwnerRouter from './routers/Owners.js';
import ServicesRouter from './routers/Services.js';

import WhyRouter from './routers/Why.js';
import GalleryRouter from './routers/Gallery.js';


// import DalleRoutes from '../routes/dalle.js';
dotenv.config();

const app=express();
app.use(cors());
app.use(express.json({limit:'50mb'}));


const About1=new mongoose.Schema({
    name:{type:String},
    nameId:{type:Number,required:true,unique:true},
    photo:{type:String,required:true}
})
const AboutSchema=mongoose.model('About',About1)
app.use('/api/about',AboutRouter)
app.use('/api/couple',CoupleRouter)
app.use('/api/service',ServiceRouter)
app.use('/api/blog',BlogRouter)
app.use('/api/owner',OwnerRouter)
app.use('/api/services',ServicesRouter)
app.use('/api/why',WhyRouter)
app.use('/api/gallery',GalleryRouter)

// app.use('/api/v1/dalle',DalleRoutes)

// app.post('/about',async(req,res)=>{
//     console.log(req.body)
//     const {name,nameId,photo}=req.body;
    
//     // const data=await AboutSchema.findOneAndUpdate({nameId:id},{$inc:{name:req.body.name,photo:req.body.photo}})
//     const fil=await AboutSchema.findOne({nameId})
//         if(fil){
//             res.send({message:'image already exists'})
//             return false;
//         }
//     const data= new AboutSchema(req.body)
//     await data.save()
//     res.send({success:true,message:"stored data",data})
// })
app.get('/',(req,res)=>{
    res.send('Hello DALL-E')
})

// app.delete('/about/delete/:id',async(req,res)=>{
//     const id=req.params.id;
//     console.log(id);
//     const data = await AboutSchema.findOneAndDelete({nameId:id})
//     res.send({Success:true,message:"Deleted data successfully",data})
// })


// app.get('/:id',(req,res)=>{
//     const id= req.params.id;
//     AboutSchema.findOne({nameId:id}).then((data)=>{
//         if(!data){
//             console.log("there is no images found")
//             res.send({success:false,photo:"there is no images found"})
//         }
//         else{

//             res.send({data})
//             console.log(data)
//         }
//     })
// })
const startServer=()=>{
    try {
        // mongoose.connect(process.env.MONGODB_URL).then(()=>console.log("db connected"))
        connectDb(process.env.MONGODB_URL)
        app.listen('https://server-442v.onrender.com/',()=>console.log('server is running'))
        
    } catch (error) {
        console.log(error)
    }
}
startServer()