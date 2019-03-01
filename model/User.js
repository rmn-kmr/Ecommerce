const db = require('../config/database');
const bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync();


const UserModel = {};

UserModel.login = (data, done)=>{
  const resData = {};

  var query = `select * from users where email = '${data.email}'`;
  console.log(query);
  db.execute(query,(err,result) =>{

    if(err) {
          resData.status = 0;
          resData.message = "Something went wrong!!";
    }else{
          var rowData = JSON.parse(JSON.stringify(result));

console.log(result);

          if(result.length > 0){
              let storedPass = rowData[0].password;
           console.log(data.password + " ---- "+ storedPass);
              if(bcrypt.compareSync( data.password, storedPass)){
                  resData.status = 1;
                  resData.message = "Successfully Login";
                  resData.id = rowData[0].id;
                  resData.email = rowData[0].email;
                  resData.profilePic = rowData[0].profilePic;
              }else{
                  resData.status = 0;
                  resData.message = "Wrong credentials";
              }
        }else{
            resData.status = 0;
            resData.message = "user not found";
        }
   }
    console.log(resData);
    done(null, resData);
  });
}


UserModel.signup =(data,done) => {


  const email = data.email;
  const password = data.password;

  var emailCheckQuery =  `select email from users where email = '${email}'`;

  db.execute(emailCheckQuery, (err, result)=>{
     const resultData = {};
     if(err){
         resultData.status = 0;
         resultData.message = "something went wrong";
         done(null,resultData);
     }else{
       console.log(result);
       if(result.length<1){
         console.log("passwrd->"+password+"--");
         var encryptedPassword = bcrypt.hashSync(password, salt);
         var insertQuery = `insert into users (email, password) values ('${email}', '${encryptedPassword}')`;

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
     }else{
           resultData.status = 0;
           resultData.message = "User already exists";
           done(null,resultData);
     }
   }
  })


}
module.exports = UserModel;
