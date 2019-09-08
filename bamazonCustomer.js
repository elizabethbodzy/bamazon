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
    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            console.table(result);
        }
        buy()

    })

};

var buy = function () {
    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        var choiceArray = [];
        for (var i = 0; i < result.length; i++) {
            choiceArray.push(result[i].product_name);
        }
        inquirer.prompt([{
            name: 'item',
            type: 'number',
            message: 'What is the item id of the product you would like to purchase?'
        },
        {
            name: 'quantity',
            type: 'number',
            message: 'How many would you like to purchase?'
        }]).then(function (answer) {
            var userItem;
            var item = answer.item;
            var quantity = answer.quantity;

            for (var i = 0; i < result.length; i++) {
                if (parseInt(answer.item) === result[i].item_id) {
                    userItem = result[i];
                }
            }

            if (userItem.stock_quantity > parseInt(answer.item)) {
               connection.query("UPDATE products SET ? WHERE ?", [{
                   stock_quantity: userItem.stock_quantity - parseInt(answer.item)

               },{
                item_id: userItem.item_id

            }], function (err) {
                if (err) throw err;

                console.log("Product purchased!");
                buy();
            });
        } else {
            console.log("Insufficient stock quantity.");
            buy();
        }
            
        })

    })
}

