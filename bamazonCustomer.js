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

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
    displayTable();
});

var displayTable = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.table(res);
        }
        buy()
    })
    
};

var buy = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer.prompt([{
            type: 'input',
            name: 'item',
            message: 'What is the item id of the product you would like to purchase?'
        },
        {
            type: 'number',
            name: 'amount',
            message: 'How many would you like to purchase?'
        }
        ]).then(function (answer) {
            console.log(answer)
            
          
                

            
        })
    }
    )}