import Express from "express";

const Routes = Express.Router();
import { userById, update, read } from "../controllers/user";
import { requireSignin, isAuth, read } from "../controllers/auth";

Routes.get("/user/:userId", requireSignin, isAuth, read, (req, res) => {
  res.json({
    user: req.profile,
  });
});

Routes.get("/user/:userId", requireSignin, isAuth, read);
Routes.put("/user/:userId", requireSignin, isAuth, update);

Routes.param("userId", userById);

module.exports = Router;
