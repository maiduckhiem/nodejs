import Express from "express";

const router = Express.Router();
import { userById, update, read } from "../controllers/user";
import { requireSignin, isAuth, isAdmin } from "../controllers/auth";

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});
router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, update);

router.param("userId", userById);

module.exports = router;
