
let dbConfig=require('../config/db.config');

let mysql=require('mysql');

let connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
  });

  connection.connect((err)=>{
    if(err){
        console.log("Unable to connect Db",err);
        
    }
    else{
        console.log("Successfully connected to database");
        
    }
  });

  module.exports=connection;