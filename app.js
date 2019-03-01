
const express =require("express");
const db = require('./config/database');
const bodyParser = require('body-parser');
const UserController = require('./controller/User');
const OrderController = require('./controller/Order');
const ProductController = require('./controller/Product');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req,file,cb) {
    cb(null,'./uploads/');
  },
  filename: function(req,file,cb){
    cb(null, new Date().toISOString() +file.originalname);

  }
});
const upload = multer({storage: storage});

const app =express();

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/user/signup', UserController.signup);
app.post('/user/login', UserController.login);
app.post('/order/add', OrderController.add);
app.post('/order/delete', OrderController.delete);
app.post('/product/add',upload.single('productImage'),ProductController.add);
app.post('/product/delete',ProductController.delete);

app.listen(3000, ()=>{
  console.log("server is running!!!");
  db.connect((err)=>{
    if (err) {
      console.log(err);
      throw err;
    }

    console.log("DB has been connected");

  })
});
