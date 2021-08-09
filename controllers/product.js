import Product from "../models/product";
import formidable from "formidable";
import fs from "fs";
import _ from "lodash";

//lấy dữ liệu từ danh sách
export const list = (req, res) => {
   let order = req.query.order ? req.query.order : "asc";
   let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
   let limit = req.query.limit ? +req.query.limit : 6;
  Product.find().select("-photo")
  .limit(limit)
  .exec((err,data)=>{
    if (err) {
      res.status(400).json({
        error: "không tìm thấy sản phẩm",
      });
    }
    res.json(data);
  })
};

//add product
// export const add = async (req, res) => {
//   try {
//     const newProduct = new Product(req.body);
//     await newProduct.save();
//     return res.status(201).json(newProduct);
//   } catch (err) {
//     console.log(err)
//   }
// };

export const add = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    //files là thằng upload để kiểm tra dung dluonwjg
    if (err) {
      return res.status(400).json({
        error: "thêm san pham thanh cong",
      });
    }
    const { name, description, price } = fields; //fields lấy từ input đâtr lên erver
    if (!name || !description || !price) {
      return res.status(400).json({ error: "bạn cần nhập đây đủ thông tin" });
    }
    //
    let product = new Product(fields);
    //

    if (files.photo) {
      if (files.photo.size > 1000000) {
        res.status(400).json({
          error: "bạn nên up lại ảnh dưới 1mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, data) => {
      if (err) {
        res.status(400).json({
          error: "không them được sản phẩm",
        });
      }
      console.log(data);
      res.json(data);
    });
  });
};

//export chi tiet san pham , dạng sử lý ở giữa xong chậy qua app
export const productByid = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      res.status(400).json({
        error: "không tìm thấy sản phẩm",
      });
    }
    req.product = product;
    next();
  });
};
export const read = (req, res) => {
  req.product.photo= undefined;
  return res.json(req.product);
};

export const remove = (req, res) => {
  let product = req.product;
  product.remove((err, deleteProduct) => {
    if (err) {
      return res.status(400).json({
        error: "không xóa được sản phẩm",
      });
    }
    res.json({
      deleteProduct,
      message: "sản phẩm đã được xóa",
    });
  });
};

// phần update sản phẩm
export const update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    //files là thằng upload để kiểm tra dung dluonwjg
    if (err) {
      return res.status(400).json({
        error: "sua san pham thanh cong",
      });
    }
    const { name, description, price } = fields; //fields lấy từ input đâtr lên erver
    if (!name || !description || !price) {
      return res.status(400).json({ error: "bạn cần nhập đây đủ thông tin" });
    }
    //
    let product = req.product;
    product = _.assignIn(product, fields);

    //

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "bạn nên up lại ảnh dưới 1mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    Product.save((err, data) => {
      if (err) {
        res.status(400).json({
          error: "không sua được sản phẩm",
        });
      }
      console.log(data);
      res.json(data);
    });
  });
};

export const photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};
