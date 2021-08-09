import  Mongoose  from "mongoose";
import crypto from "crypto";
import {v4 as uuidv4} from "uuid"

const userSchema = new Mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxLength:32
    },
    email:{
        type:String,
        trim:true,
        required:true,
        maxLength:32
    },
    hashed_password:{
        type:String,
        required:true
    },
    about:{
        type:String,
        trim:true
    },
    salt:{
        type:String
    },
    role:{
        type:Number,
        default:0
    },
    history:{
        type:Array,
        default:[]
    }
},{timestamps:true})

userSchema.virtual('password').set(function(password){
    this.salt = uuidv4()
    this.hashed_password = this.encryPassword(password)
})

userSchema.methods={
    authenticate: function(plainText){
        return this.encryPassword(plainText)===this.hashed_password;
    },
    encryPassword:function (password){
        if(!password) return "";
        try {
            return crypto.createHmac('sha1',this.salt)
            .update(password)
            .digest('hex')
        }catch(error){
            return "";
        }
    }
}

module.exports = Mongoose.model("user",userSchema);