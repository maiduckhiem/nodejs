import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import categoryRoutes from "./routes/category";
// import productRoutes from './routes/product';

const app = express();
dotenv.config();
app.use(bodyParser.json());

//connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("database connection");
  });

mongoose.connection.on("error", (err) => {
  console.log(`data connect failed, ${err.message}`);
});

const productRoutes = require("./routes/product");

//routes
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server it runing on port : ${port}`);
});
