const mysql = require("mysql");
const configdb = require('./config.json').database;

var con = mysql.createConnection({
  host: configdb.host,
  user: configdb.user,
  password : configdb.password,
  database : configdb.dbname

});

let Database ={};


Database.connect =  function(done) {
  con.connect(function(err){
    if(err) done(err);
    console.log("connected");
    done(null);
  });

};

Database.execute = (queryStr,done) => {
  con.query(queryStr, (err,result)=> {
    if(err) done(err);
    done(null,result);
  });
};
module.exports = Database;
