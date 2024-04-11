import mongoose from 'mongoose';

const Service=new mongoose.Schema({
    nameId:{type:Number,required:true,unique:true},
    photo:{type:String,required:true}
})

const ServiceSchema = mongoose.model('service', Service);

export default ServiceSchema;