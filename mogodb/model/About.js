import mongoose from 'mongoose';

const About=new mongoose.Schema({
    name:{type:String,},
    nameId:{type:Number,required:true,unique:true},
    photo:{type:String,required:true}
})

const AboutSchema = mongoose.model('abouts', About);

export default AboutSchema;