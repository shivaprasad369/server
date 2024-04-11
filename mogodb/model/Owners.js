import mongoose from 'mongoose';

const Owner=new mongoose.Schema({
    nameId:{type:Number,required:true,unique:true},
    name:{type:String,},
    photo:{type:String,required:true}
})

const OwnerSchema = mongoose.model('Owners', Owner);

export default OwnerSchema;