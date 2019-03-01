const db = require('../config/database');
const OrderModel = {};

// ADd Records in order_table

OrderModel.add =(data,done) => {

  const userid = data.userid;
  const productID = data.productID;
  const quantity = data.quantity;

var insertQuery = `insert into order_table(userid, productID, quantity) values('${userid}','${productID}','${quantity}')`;
  const resultData = {};
  db.execute(insertQuery, (err, result)=>{

    console.log(result);
    if (err) {
      resultData.status = 0;
      resultData.message = "something went wrong";
    }else {
        resultData.status = 1;
        resultData.message = "Successfully inserted";
    }

    done(null,resultData);
  })

}

// Delete Record from order_table

OrderModel.delete = (data,done) => {
  const orderid = data.orderid;
  var deleteQuery = `delete from order_table where id ='${orderid}'`;
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

module.exports = OrderModel;
