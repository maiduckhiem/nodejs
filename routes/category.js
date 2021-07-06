import Express from "express";
import { list, add , categoryById , read , update} from "../controllers/category";
const routes = Express.Router();

routes.post("/category", add);
routes.get('/categories', list);
routes.param('/category', categoryById);
routes.get('/category/:categoryId', read)
routes.put('/category/:categoryId', update)
module.exports = routes;
