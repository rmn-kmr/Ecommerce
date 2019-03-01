var ProductModel = require('../model/Product');



let ProductController = {};

ProductController.add = (req,res) => {

    ProductModel.add(req,(err,result)=> {
      res.send(result);
    })
}


ProductController.delete = (req,res) => {

  let data =req.body;

    ProductModel.delete(data,(err,result)=> {
      res.send(result);
    })
}

module.exports = ProductController;
