import Express from "express";
import { list, add , categoryById , read , update , remove} from "../controllers/category";
const routes = Express.Router();

routes.post("/category", add);
routes.get("/categories", list);
//add k
routes.get('/category/:categoryId', read)
routes.put('/category/:categoryId', update)

routes.delete('/category/:categoryId', remove)


routes.param("categoryId", categoryById);
module.exports = routes;
