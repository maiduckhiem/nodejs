import express from "express";
import {
  list,
  add,
  productByid,
  read,
  remove,
  update,
  photo,
} from "../controllers/product";
const routes = express.Router();

routes.get("/products", list);
routes.put("/product/:productId", update);
routes.get("/product/:productId", read);

routes.delete("/product/:productId", remove);
routes.get("product/photo/:productId", photo);
// list product
routes.post("/products", add);

routes.param("productId", productByid);

module.exports = routes;
