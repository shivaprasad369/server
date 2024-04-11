import mongoose from 'mongoose';

const gallery=new mongoose.Schema({
    
    nameId:{type:Number,required:true,unique:true},
    photo:{type:String,required:true}
})

const GallerySchema = mongoose.model('gallerys', gallery);

export default GallerySchema;