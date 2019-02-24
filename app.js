
const express =require("express");
const db = require('./config/database');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const multer = require('multer');
const UserController = require('./controller/User');
var salt = bcrypt.genSaltSync();

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

app.post('/product/add',upload.single('productImage'),(req,res) => {
  const name =req.body.name;
  const price = req.body.price;
  const productImage = req.file.path;

  var insertQuery = `insert into product(name,price,productImage) values('${name}','${price}','${productImage}')`;
  const resultData = {};
  db.execute(insertQuery,(err,result)=>{
    if(err) {
      resultData.status =0;
      resultData.message="something went wrong";
    } else {
      resultData.status=1;
      resultData.message ="Successfully Inserted Product data";
    }
    res.send({
      data : resultData
    });
  });

});

app.post('/productfav',(req,res)=> {

  const pid = req.body.pid;
  const uid = req.body.uid;

  const favkey= req.body.favkey;
  if(favkey =='1') {
    var insertProdcutFav =`insert into product_favourite(pid,uid) values('${pid}','${uid}')`;
    const resultData = {};
    db.execute(insertProdcutFav,(err,result) => {
      if(err){
        resultData.status=0;
        resultData.message = "Something went wrong";
      } else {
        resultData.status=1;
        resultData.message = "Successfully inserted in product favourite table";
      }
      res.send({
        data: resultData
      });

    });
  } else {
    var deleteProductFav = `delete from product_favourite where pid ='${pid}' and uid = '${uid}' `;
    const resultData = {};
    db.execute(deleteProductFav,(err,result)=>{
      if(err){
        resultData.status=0;
        resultData.message = "Something went wrong";
      } else {
        resultData.status=1;
        resultData.message = "Successfully deleted in product favourite table";
      }
      res.send({
        data: resultData
      });

    });
  }


});

app.post('/user/login', UserController.login);

app.post('/products',(req, res)=>{
  var data = req.body;
  var page = data.page;
  var userId= data.userId;

  if(page == undefined || page == '0' || page == '-1'){
    page = 0;
  }

  if (data.searchKey == undefined || data.searchKey.trim() =='') {
    data.searchKey = '';
  }
//  var query = `SELECT * FROM  product inner join product_favourite ON product.id=product_favourite.pid  where  product_favourite.uid  like '%${data.searchKey}%' limit ${page*3}, 3`;

if(userId!=undefined) {
  var query = `SELECT * FROM product left join product_favourite ON  product_favourite.pid  = product.id  limit ${page*3}, 3`;
}else {

}
  console.log(query);
    db.execute(query, (err,result)=> {
      if (err) throw (err);
      res.send(result);
    });

});

app.post('/order/add', (req, res)=>{
  var data = req.body;
  const userid = data.userid;
  const productID = data.productID;
  const quantity = data.quantity;

var insertQuery = `insert into order (userid, productID,quantity) values ('${userid}', '${productID}', '${quantity}')`;
const resultData = {};
db.execute(insertQuery, (err, result)=>{
 if (err) {
   resultData.status = 0;
   resultData.message = "something went wrong";
 }else {
     resultData.status = 1;
     resultData.message = "Successfully inserted in order";
 }

 res.send({
   data : resultData
 });
});
});

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
