import mongoose from "mongoose";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

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
    hashed_password: {
      type: String,
      required: true,
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
    this.salt = uuidv4(); // dùng để mã hóa password
    this.hashed_password = this.encrytPassword(password);
    console.log("this.hashed_password", this.hashed_password);
  });

authSchema.methods = {
  authenticate: function (plainText) {
    console.log("hashed_password", this.hashed_password);
    return this.encrytPassword(plainText) === this.hashed_password;
  },
  encrytPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex"); // what the dis?
    } catch (error) {
      return "";
    }
  },
};
module.exports = mongoose.model("User", authSchema);
