create database  if not exists project_store;

create table users(
id varchar(50) not null primary key,
username varchar(30) not null,
password varchar(30) not null,
admin bool
);
