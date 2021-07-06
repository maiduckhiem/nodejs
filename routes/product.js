import express from 'express';
import { list , add , productByid , read ,remove , update} from '../controllers/product'
const routes = express.Router();


routes.get('/products', list);
routes.put('/product/:productId',update)
routes.get('/product/:productId',read);

routes.delete("/product/:productId", remove);

routes.param('productId', productByid);
// list product
routes.post('/products', add);

module.exports = routes;