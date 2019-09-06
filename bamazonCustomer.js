var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
// Your port; if not 3306
port: 3306,

// Your username
user: "root",

// Your password
password: "Yosterkitty3",
database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
  });

  var displayTable = function() {
      connection.query("SELECT * FROM products", function(err,results) {
          if(err) throw err;
          console.table(results);
      })
  }

  var start = function() {
    connection.query("SELECT * FROM products", function(err,results) {
        if(err) throw err;
    inquirer.prompt({
        name: 'postOrBid',
        type: 'list',
        message: 'Would you like to [POST] an auction or [BID] on an auction?',
        choices: ["POST", "BID"]
  }).then(function(answer) {
      if(answer.postOrBid.toUpperCase() == "POST") {
          postAuction();
      } else {
          //bidAuction();
      }
  })
}

displayTable();