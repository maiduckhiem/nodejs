import  mongoose  from "mongoose";

const categoryshema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        maxlength:32
    }
},{timestamps:true});

module.exports = mongoose.model('category',categoryshema);