var UserModel = require('../model/User');

let UserController = {};

UserController.login = (req, res) => {



  let data = req.body;
  const email = data.email;
  const password = data.password;
    if(email != undefined && password != undefined){
     UserModel.login(data, (err, result)=>{
       res.send(result);
     });
   }else{
     let resData = {};
     resData.status = 0;
     resData.message = "email and password required!!";
     res.send(resData);
   }

}

UserController.signup = (req,res) => {

  let data =req.body;
  const email =data.email;
  const password = data.password;
  console.log("--------------------------------------");

    if(email != undefined && email.trim() != '' && password != undefined && password.trim() != '' ) {
      UserModel.signup(data,(err,result)=> {
        res.send(result);
      })

    }
  else {
    let resData = {};
    resData.status=0;
    resData.message="email and password required!!";
    res.send(resData);
  }
}

module.exports = UserController;
