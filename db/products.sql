create database  if not exists project_store;

create table users(
    id varchar(50) not null primary key,
    username varchar(30) not null,
    password varchar(30) not null,
    role varchar(10) not null
);

create table products(
	id INT NOT NULL AUTO_INCREMENT,
	name varchar(30) not null,
	price decimal(10,2) not null,
	stock int(6) not null,
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
    id_order int,
    id_product int,
    price decimal(10,2),    
    amount int,
    FOREIGN KEY (id_order) REFERENCES orders(id),
    FOREIGN KEY (id_prodcut) REFERENCES products(id)
);