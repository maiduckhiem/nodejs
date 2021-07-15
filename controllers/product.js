import Product from "../models/product";
import formidable from "formidable";
import lodash from "lodash";

//lấy dữ liệu từ danh sách
export const list = (req, res) => {
  Product.find((err, data) => {
    if (err) {
      error: "không tìm thấy sản phẩm";
    }
    res.json(data);
  });
};

//add product
export const add = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "them san pham thanh cong",
      });
    }
    const { name, description, price } = fields;
    if (!name || !description || !price) {
      return res.status(400).json({ error: "bạn cần nhập đây đủ thông tin" });
    }
    let product = new Product(fields);
    if (fields.photo) {
      if (files.photo.size > 10000) {
        res.status(400).json({
          error: "bạn nên up lại ảnh dưới 1mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.type);
      product.photo.contentType = file.photo.path;
    }
    product.save((err, data) => {
      if (err) {
        res.status(400).json({
          error: "không thêm được sản phẩm",
        });
      }
      res.json({ data });
    });
    console.log(files);
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
  form.parse(req, (err, fields, files) => { //files là thằng upload để kiểm tra dung dluonwjg 
    console.log(files);
    if (err) {
      return res.status(400).json({
        error: "sửa san pham thanh cong",
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
    if (fields.photo) {
      if (files.photo.size > 10000) {
        res.status(400).json({
          error: "bạn nên up lại ảnh dưới 1mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.type);
      product.photo.contentType = file.photo.path;
    }
    product.save((err, data) => {
      if (err) {
        res.status(400).json({
          error: "không sửa được sản phẩm",
        });
      }
      res.json( data );
    });
  });
};