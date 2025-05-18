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