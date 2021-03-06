DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR (100) NOT NULL,
department_name VARCHAR (100) NOT NULL,
price DECIMAL (5,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone X", "Phone", 300.00, 100),
("Xbox One", "Gaming", 150.99, 12),
("JBL Wireless Speaker", "Music", 129.99, 30),
("Art Record Covers Coffee Table Book", "Books", 140.00, 22),
("Throw Blanket", "Home", 29.99, 10),
("Men's Ugg Slippers", "Shoes", 99.99, 10),
("Men's Adidas Sandals", "Shoes", 30.00, 5),
("Women's Adidas Sandals", "Shoes", 30.00, 5),
("Macbook Charger", "Computer", 45.99, 12),
("Oil Diffuser", "Home", 60.00, 18);
