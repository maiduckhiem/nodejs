import Express from "express";

const Routes = Express.Router();

import { signup, signin, signout, accountAcivation } from "../controllers/auth";

Routes.post("/signup", signup);
Routes.post("/account-activation", accountAcivation);
Routes.get("signout", signout);
Routes.post("signin", signin);

module.exports = Routes;
