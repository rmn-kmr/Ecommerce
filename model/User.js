const db = require('../config/database');

const UserModel = {};

UserModel.login = (data, done)=>{
  const resData = {};

  var query = `select * from users where email = '${data.email}' and password ='${data.password}'`;
  db.execute(query,(err,result) =>{

    if(err) {
          resData.status = 0;
          resData.message = "Something went wrong!!";
    }else{
          var data = JSON.parse(JSON.stringify(result));
          console.log(data);
          if(result.length > 0){
            resData.status = 1;
            resData.message = "Successfully Login";
            resData.id = data[0].id;
            resData.email = data[0].email;
            resData.profilePic = data[0].profilePic;
          }else{
              resData.status = 0;
              resData.message = "Wrong credentials";
          }
   }
    console.log(resData);
    done(null, resData);
  });
}


UserModel.signup =(data,done) => {

  const email = data.email;
  const password = data.password;

  //Encryption


   //   var encryptedPassword = bcrypt.hashSync(password, salt);
   //   Decrypt
   //   var orgPassword = bcrypt.compareSync(password, encryptedPassword);

  var insertQuery = `insert into users (email, password) values ('${email}', '${password}')`;
  const resultData = {};
  db.execute(insertQuery, (err, result)=>{

    console.log(result);
    if (err) {
      resultData.status = 0;
      resultData.message = "something went wrong";
    }else {
        resultData.status = 1;
        resultData.message = "Successfully signup";
    }

    done(null,resultData);
  })
}
module.exports = UserModel;
