let mysql = require('mysql');
let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ticketmanager'
  });
  
  con.connect((err) => {
    if(err){
      console.log('Error connecting to DB');
      return;
    }
    console.log('Connection OK');
  });

  module.exports = con;