import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors'
// import morgan from "morgan"
// import productRoutes from './routes/product';

const app = express();
dotenv.config();

//connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("database connection");
  });

mongoose.connection.on("error", (err) => {
  console.log(`data connect failed, ${err.message}`);
});
const authRoutes = require("./routes/auth");
const CategoryRoutes = require('./routes/category');
const productRoutes = require("./routes/product");
// const userRoutes = require("./routes/user")

// app.use(morgan("dev"));
app.use(cors({credentials:"same-origin"}));
app.use(express.json());

//routes
// app.use("/api", userRoutes)
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", CategoryRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server it runing on port : ${port}`);
});
