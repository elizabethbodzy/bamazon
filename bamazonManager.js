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
    // displayTable();

});

var managerView = function () {
    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        inquirer.prompt([{
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']
        }]).then(function (answer) {
            var action = answer.action;
            switch (action) {
                case 'View Products for Sale': connection.query("SELECT * FROM products", function (err, result) {
                    if (err) throw err;
                    console.table(result);
                    managerView();
                });
                    break;
                case 'View Low Inventory': connection.query("SELECT * FROM products WHERE stock_quantity < 20", function (err, result) {
                    if (err) throw err;
                    console.table(result);
                    managerView();
                });
                    break;
                case 'Add to Inventory':
                    inquirer.prompt([{
                        name: 'product',
                        type: 'list',
                        choices: function () {
                            var choiceArray = [];
                            for (var i = 0; i < result.length; i++) {
                                choiceArray.push(result[i].product_name);
                            }
                            return choiceArray;
                        },
                        message: 'Choose what product you would like to stock.'
                    },
                    {
                        name: 'quantity',
                        type: 'input',
                        message: 'How much would you like to add?'
                    }]).then(function (response) {
                        var userItem;
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].product_name === response.product) {
                                userItem = result[i];
                            }
                        }
                        connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: userItem.stock_quantity + parseInt(response.quantity)
                        }, {
                            item_id: userItem.item_id

                        }], function (err) {
                            if (err) throw err;
                            console.log('Stock added successfully!')

                        })

                    });
            };
        });
    });
};
managerView();


