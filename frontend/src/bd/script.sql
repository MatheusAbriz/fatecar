--Criando o banco de dados do Fatecar
create database fatecar;
use fatecar;

create database teste2;
use teste2;

--tabela passageiro
create table passageiro(
    id_passageiro int not null auto_increment,
    nome_passageiro varchar(100) not null,
    email_passageiro varchar(100) not null,
    cpf_passageiro varchar(100) not null,
    telefone_passageiro varchar(100) not null,
    senha_passageiro varchar(100) not null,
    genero_passageiro CHAR(1) not null,
    endereco_passageiro varchar(100) not null,
    estado_passageiro varchar(100) not null,
    cidade_passageiro varchar(100) not null
    img_passageiro blob,
    primary key(id_passageiro)
);

create table teste(
    id_teste int not null auto_increment,
    img_teste blob,
    primary key(id_teste)
)