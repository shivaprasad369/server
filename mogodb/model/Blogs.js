import mongoose from 'mongoose';

const blogs=new mongoose.Schema({
    name:{type:String,},
   published_At:{type:String},
    photo:{type:String,required:true},
    header:{type:String,required:true},
  content:{type:String}
})

const BlogsSchema = mongoose.model('blogs', blogs);

export default BlogsSchema;