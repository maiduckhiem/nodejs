import Category from "../models/category";

//add category
export const add = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "không thêm được danh mục",
      });
    }
    res.json({ data });
  });
};

//list category
export const list = (req, res) => {
  Category.find((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "danh mục không tồn tại",
      });
    }
    res.json({ categories });
  });
};

//detail category
export const categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      res.status(400).json({
        error: "không tìm thấy danh mục",
      });
    }
    req.category = category;
    next();
  });
};
export const read = (req, res) => {
  return res.json(req.category);
};

//uppdate category

export const update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err || !category) {
      res.status(400).json({
        error: "danh mục này không tồn tại",
      });
    }
    res.json({data});
  });
};
