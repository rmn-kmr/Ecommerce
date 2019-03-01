const db = require('../config/database');
const ProductModel = {};

// ADd Records in order_table

ProductModel.add =(req,done) => {

  const name = req.body.name;
  const price = req.body.price;
  const productImage = req.file.path;


var insertQuery = `insert into product(name, price, productImage) values('${name}','${price}','${productImage}')`;
  const resultData = {};
  db.execute(insertQuery, (err, result)=>{

    console.log(result);
    if (err) {
      resultData.status = 0;
      resultData.message = "something went wrong";
    }else {
        resultData.status = 1;
        resultData.message = "Successfully inserted in product table";
    }

    done(null,resultData);
  })

}

// Delete Record from order_table

ProductModel.delete = (data,done) => {
  const productid = data.productid;
  var deleteQuery = `delete from product where id ='${productid}'`;
  const resultData ={};
  db.execute(deleteQuery,(err,result)=> {
    if(err) {
      resultData.status=0;
      resultData.message = "something went wrong";
    } else {
      resultData.status=1;
      resultData.message="Successfully deleted";
    }
    done(null, resultData);
  })

}


module.exports = ProductModel;
