drop database if exists employeeTrack_db;
create database employeeTrack_db;
use employeeTrack_db;

create table department (
    ID int not null AUTO_INCREMENT,
    Name varchar(30) not null,
    primary key (ID)
);

create table roles (
    ID int not null AUTO_INCREMENT,
	Department_ID int not null,
    Title varchar(30) not null,
    Salary decimal not null,
    primary key (ID)
);

create table employee (
    ID int not null AUTO_INCREMENT,
    First_Name varchar(30) not null,
    Last_Name varchar (30) not null,
    Role_ID int not null,
    Manager_ID int null,
    primary key (ID)
);

INSERT INTO department(name) VALUES ("Human Resources"), ("Customer Relations"), ("Accounting"), ("Administration"), ("Sales"), ("Warehouse");

INSERT INTO roles (department_id, title, salary) VALUES (1, "HR Manager", 60000), (2, "Customer Relations Lead", 50000), (2, "Customer Relations", 50000), (3, "Accountant", 50000), (4, "Regional Manager", 70000), (4, "Assistant Regional Manager", 60000), (4, "Receptionist", 40000), (5, "Sales", 60000), (6, "Warehouse Manager", 50000), (6, "Warehouse Worker", 30000);

INSERT INTO employee (First_name, last_name, role_id, manager_id) VALUES ("Michael", "Scott", 5, NULL), ("Dwight", "Schrute", 6, 1), ("Jim", "Halpert", 1, 1), ("Pam", "Beasley", 7, 1), ("Stanley", "Hudson", 8, 1), ("Phyllis", "Vance", 8, 1), ("Angela", "Martin", 4, 1), ("Oscar", "Gutierrez", 4, 1), ("Kevin", "Malone", 4, 1), ("Creed", "Bratton", 1, 1), ("Andy", "Bernard", 8, 1), ("Toby", "Flenderson", 1, NULL), ("Ryan", "Howard", 7, 1), ("Erin", "Hannon", 7, 1), ("Darryl", "Philbin", 9, 1), ("Roy", "Anderson", 10, 1), ("Kelly", "Kapour", 2, 1);
