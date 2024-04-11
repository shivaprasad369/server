import mongoose from 'mongoose';

const Couple=new mongoose.Schema({
    nameId:{type:Number,required:true,unique:true},
    name:{type:String,},
    photo:{type:String,required:true},
    link:{type:String,required:true},
    desc:{type:String,required:true}
})

const CoupleSchema = mongoose.model('couples', Couple);

export default CoupleSchema;