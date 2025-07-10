create database  if not exists project_store;
use  project_store;
create table users(
    id varchar(50) NOT NULL primary key,
    username varchar(30) NOT NULL,
    password varchar(255) NOT NULL,
    role varchar(10) NOT NULL
);

create table products(
	id INT NOT NULL AUTO_INCREMENT,
	name varchar(30) NOT NULL,
	image varchar(255) NOT NULL,
	price decimal(10,2) NOT NULL,
	stock int(6) NOT NULL,
    primary key(id)
);
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_user varchar(50) NOT NULL, 
  date DATETIME NOT NULL,
  total DECIMAL(10,2),
  FOREIGN KEY (id_user) REFERENCES users(id)
);
 CREATE TABLE order_product(
    id_order int NOT NULL,
    id_product int NOT NULL,
    price decimal(10,2) NOT NULL,    
    amount int NOT NULL,
    FOREIGN KEY (id_order) REFERENCES orders(id),
    FOREIGN KEY (id_product) REFERENCES products(id)
);
DELIMITER $$

CREATE TRIGGER reduce_product_stock
AFTER INSERT ON order_product
FOR EACH ROW
BEGIN
  UPDATE products
  SET stock = stock - NEW.amount
  WHERE id = NEW.id_product;
END$$

DELIMITER ;
ALTER TABLE products
ADD CONSTRAINT chk_stock_min CHECK (stock >= 0);

INSERT INTO products (name, price, stock, image) VALUES
('Apple', 4.88, 123, 'https://www.applesfromny.com/wp-content/uploads/2020/05/20Ounce_NYAS-Apples2.png'),
('Banana', 2.30, 200, 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg'),
('Orange', 3.25, 150, 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg'),
('Grapes', 5.10, 100, 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Table_grapes_on_white.jpg'),
('Pineapple', 6.75, 60, 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Pineapple_and_cross_section.jpg'),
('Strawberry', 4.99, 90, 'https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg'),
('Kiwi', 3.40, 75, 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Kiwi_aka.jpg'),
('Mango', 4.50, 80, 'https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg'),
('Tomato', 2.99, 130, 'https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg');

