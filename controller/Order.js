
var OrderModel = require('../model/Order');

let OrderController = {};

OrderController.add = (req,res) => {

  let data =req.body;

    OrderModel.add(data,(err,result)=> {
      res.send(result);
    })
}

OrderController.delete = (req,res) => {

  let data =req.body;

    OrderModel.delete(data,(err,result)=> {
      res.send(result);
    })
}
module.exports = OrderController;
