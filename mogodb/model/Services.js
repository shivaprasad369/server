import mongoose from 'mongoose';

const Services=new mongoose.Schema({
    nameId:{type:Number,required:true,unique:true},
    name:{type:String},
    photo:{type:String,required:true}
})

const ServicesSchema = mongoose.model('servicesPage', Services);

export default ServicesSchema;