import User from "../models/user";

export const userById = (req, res, next, id) => {
  User.findId(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user khong ton tai",
      });
    }
    req.profile = user;
    next();
  });
};

export const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

export const update = (req, res) => {
  User.findOneAndUpdate(
    {_id: req.profile.id,},
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "ban khong co quyen",
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
};
