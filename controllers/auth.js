import Auth from "../models/auth";
import jwt from 'jsonwebtoken'
// const nodemailer = require("nodemailer");
// const expressJwt = require("express-jwt");
export const signup = (req, res) => {
  console.log(req.body)
  const user = new Auth(req.body);
  user.save((err, user) => {
    if (err) {
      res.json({
        message: "Dang ky không thanh cong",
      });
    }
    console.log(user)
    res.json(user);
  });
};

export const signin = (req, res) => {
  //tìm dữ liệu người dùng trên email
  const { email, password } = req.body;
  Auth.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "tài khoản của bạn không tồn tại",
      });
    }
    // nếu người dùng tìm thấy phải đảm bảo email và password khớp nhau
    //tạo phương thức model user
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "email and password not match"
      })
    }
    //kh hieu thi the moi hoi :))
//thoi tu tim di ch chet

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //luôn đặt t trong cookie
    res.cookie("t", token, { exprire: new Date() + 9999 });
    // trả về phản hồi với người dùng và mã token
    const { _id, name, email, role } = user;
    return res.json({
      token,
      user: { _id, email, name, role }
    });
  });
};

export const signout = (req, res) => {
  res.clearCookie('t');
  res.json({
    message: 'signout success'
  })
};


// exports.isAdmin = (req,res) => {
//   if(req.profile.role==0){
//     return res.status(403).json({
//       error:"tu choi quyen dang nhap"
//     })
//   }
// }

// export const isAuth = (req, res, next) => {
//   let user = req.profile && req.auth && req.profile._id == req.auth._id;
//   if (!user) {
//     return res.status(403).json({
//       error: "Access Denied",
//     });
//   }
//   next();
// };

// export const requireSignin = expressJwt({
//   secret: process.env.JWT_SECRET,
//   algorithms: ["HS256"], // added later
//   userProperty: "auth",
// });


// export const accountActivation = (req, res) => {
//   console.log(req.body);
//   const { token } = req.body;
//   if (token) {
//     jwt.verify(
//       token,
//       process.env.JWT_ACCOUNT_ACCTIVATION,
//       function (err, decode) {
//         if (err) {
//           console.log("Lỗi token", err);
//           return res.status(400).json({
//             error: "Expired link. Signup again",
//           });
//         }
//         const { name, email, hashed_password } = jwt.decode(token);
//         const user = new User({ name, email, hashed_password });
//         user.save((error, user) => {
//           if (error) {
//             return res.status(400).json({
//               error: "Không thể đăng ký tài khoản",
//             });
//           }
//           user.salt = undefined;
//           user.hashed_password = undefined;
//           res.json({ user });
//         });
//       }
//     );
//   }
// };


// export const signup = (req, res) => {
//   const { name, email, hashed_password } = new User(req.body);
//   User.findOne({ email }).exec(async (err, user) => {
//     if (user) {
//       return res.status(400).json({
//         error: "Email is taken",
//       });
//     }
//     const token = jwt.sign(
//       { name, email, hashed_password },
//       process.env.JWT_ACCOUNT_ACCTIVATION,
//       { expiresIn: "10m" }
//     );

//     let testAccount = await nodemailer.createTestAccount();

//     let transporter = nodemailer.createTransport({
//       host: "smtp.ethereal.email",
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: testAccount.user, // generated ethereal user
//         pass: testAccount.pass, // generated ethereal password
//       },
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: process.env.EMAIL_FROM,
//       to: email,
//       subject: `Account activation link`,
//       html: `
//                 <h1>Please use the following link to activate your account</h1>
//                 <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
//                 <hr />
//                 <p>This email may contain sensetive information</p>
//                 <p>${process.env.CLIENT_URL}</p>
//             `,
//     });
//     console.log("Message sent: %s", info.messageId);
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   });
// };

export const listuser = (req,res)=>{
  Auth.find((err, data) => {
    if (err) {
      res.status(400).json({
        error: "không tìm thấy sản phẩm",
      });
    }
    res.json(data);
  });
}