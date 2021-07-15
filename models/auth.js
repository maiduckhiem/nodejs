import mongoose from "mongoose";
import crypto from 'crypto'
import uuidv4 from "uuidv4";

const authSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

authSchema
  .virtual("password") //tạo ra một field ảo
  .set(function (password) {
    // password naỳ lấy từ thằng field đẩy lên
    console.log("password model", password);
    this.salt = uuidv4(); // dùng để mã hóa password
    console.log("this.salt", this.salt);
    this.hashed_password = this.encrytPassword(password);
    console.log("this.hashed_password", this.hashed_password);
  });

authSchema.methods = {
  userSchema: function (plainText) {
    return this.encrytPassword(plainText) === this.hashed_password;
  },
  encrytPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .disgest("hex");
    } catch (error) {
      return "";
    }
  },
}
module.exports = authSchema;
