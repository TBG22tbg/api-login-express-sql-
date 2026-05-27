CREATE DATABASE sistema_login;

USE sistema_login;

CREATE TABLE usuarios (
	id INT AUTO_INCREMENT  PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL
);