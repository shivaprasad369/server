import mongoose from 'mongoose';

const why=new mongoose.Schema({
    nameId:{type:Number,required:true,unique:true},
    name:{type:String},
    photo:{type:String,required:true}
})

const WhySchema = mongoose.model('why', why);

export default WhySchema;