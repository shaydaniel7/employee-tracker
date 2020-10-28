const mysql = require("mysql");
const inquirer = require('inquirer');
const consoletable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Peewee77!",
    database: "employeeTrack_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("\n" + "***** Welcome to Employee Tracker! *****" + "\n");
    runProgram();
});

function runProgram() {
    inquirer.prompt({
        type: "list",
        message: "What action would you like to take?",
        name: "directory",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update employee data", "Exit"]

    })
        .then(response => {

            switch (response.directory) {
                case "View all departments":
                    viewDepartments();
                    break;
                case "View all roles":
                    viewRoles();
                    break;
                case "View all employees":
                    viewEmployees();
                    break;
                case "Add a department":
                    addDept();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Update employee role":
                    updateRole();
                    break;
                case "Exit":
                    console.log("\n" + "***** Thank you for using Employee Tracker! *****" + "\n");
                    connection.end();
                    break;
            }
        });
}

function viewDepartments() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.log("\n" + "DEPARTMENTS: " + "\n");
        console.table(res);
        runProgram();
    });
};

function viewRoles() {
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        console.log("\n" + "ROLES: " + "\n");
        console.table(res);
        runProgram();
    });
};

function viewEmployees() {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.log("\n" + "EMPLOYEES: " + "\n");
        console.table(res);
        runProgram();
    });
};

function addDept() {
    inquirer.prompt({
        type: 'input',
        message: 'What would you like to call the new department? ',
        name: 'Department',
    })
        .then(function (res) {
            connection.query('INSERT INTO department SET ?', { name: res.Department },
                
            function (err, res) {
                    if (err) throw err;
                    console.log('\n' + '*** Added a new department! ***' + '\n');
                    runProgram();
            });

        })
};

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the ID of the department that this new role will belong to?',
            name: 'Department_ID'
        },
        {
            type: 'input',
            message: 'What would you like to call the new role? ',
            name: 'Title'
        },
        {
            type: 'input',
            message: 'What is the yearly salary for this new role?',
            name: 'Salary'
        }

    ])
        .then(function (res) {
            connection.query('INSERT INTO roles SET ?', { Department_ID: res.Department_ID, Title: res.Title, Salary: res.Salary },

                function (err, res) {
                    if (err) throw err;
                    console.log('\n' + '*** Added a new role! ***' + '\n');
                    runProgram();
                });
        });

}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the employee's first name?",
            name: 'first_name'
        },
        {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'last_name'
        },
        {
            type: 'input',
            message: "What is the employee's new role?" + " (" + "Please enter a 'Role ID' number." + ")",
            name: 'role_id'
        }

    ])
        .then(function (res) {
            connection.query('INSERT INTO employee SET ?', { first_name: res.first_name, Last_name: res.last_name, role_id: res.role_id },

                function (err, res) {
                    if (err) throw err;
                    console.log('\n' + '*** Added a new employee! ***' + '\n');
                    runProgram();
                });
        });

}

function updateRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Which employee's role would you like to update?",
            name: 'employee'
        },
        {
            type: 'input',
            message: "What is the employee's new role?",
            name: 'role'
        }

    ])
        .then(function (res) {
            connection.query('UPDATE employee SET ? WHERE ?', { employee: `${res.employee}` }, { role: `${res.role}` },

                function (err, res) {
                    if (err) throw err;
                    console.log("Successfully updated the employee's role!");
                    runProgram();
                });
        });

}

