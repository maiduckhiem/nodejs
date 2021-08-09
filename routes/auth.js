import express from "express";

const routes = express.Router();

import {
  signup,
  signin,
  signout,
  accountAcivation,
  listuser,
} from "../controllers/auth";

routes.post("/signup",signup)
// Routes.post("/account-activation", accountAcivation);
routes.get("/signout", signout);
routes.post("/signin", signin);
routes.get("/listuser",listuser);
module.exports = routes;
