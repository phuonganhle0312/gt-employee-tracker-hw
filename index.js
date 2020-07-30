const inquirer = require("inquirer");
const mysql = require("mysql");
const { start } = require("repl");
const connection =
mysql.createConnection({
    host: "localhost",
    //port
    port: 3306,
    //username
    user: "root",
    //password
    password: "htmschik96",
    database: "employee"

});
//connect to mysql server and database
connection.connect(function (err) {
    if (err) throw err;
    console.log("You are connected");
    //run function
    questions();
});

function questions() {
    inquirer.prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
          "Browse Company",
          "Add Entry To Company",
          "Update Company",
      ],
    })
    .then((choice) => {
        if (choice.action === "Browse Company") {
            browseCompany();
        } else if (choice.action === "Add Entry To Company") {
            addEntry();
        } else if (choice.action === "Update Company") {
            updateCompany();
        }
    });
}
//BROWSE COMPANY FUNCTIONS
function browseCompany() {
    inquirer.prompt({
        type: "list",
        name: "browse",
        message: "What would you like to view?",
        choices: [
            "Browse Department",
            "Browse Roles",
            "Browse Employees",
        ],
    })
    .then((choice)=> {
        if (choice.browse === "Browse Department") {
            browseDepartment();
        } else if (choice.browse === "Browse Roles") {
            browseRoles();
        } else if (choice.browse === "Browse Employees") {
            browseEmployees();
        }
    });
}
//browse department
function browseDepartment() {
    connection.query("SELECT * FROM department", (err, data)=> {
        if (err) throw err;
        console.table(data);
        //run function
        questions();
    });
}
//browse roles
function browseRoles() {
    connection.query("SELECT * FROM roles", (err, data)=> {
        if (err) throw err;
        console.table(data);
        //run function
        questions();
    });
}
//browse roles
function browseEmployees() {
    connection.query("SELECT * FROM employees", (err, data)=> {
        if (err) throw err;
        console.table(data);
        //run function
        questions();
    });
}

//ADD ENTRY FUNCTIONS
function addEntry() {
    inquirer.prompt({
        type: "list",
        name: "add",
        message: "What would you like to add?",
        choices: ["Add Employeee", "Add Department", "Add Roles"],
    })
    .then((choice)=> {
        if (choice.add === "Add Employee") {
            addEmployee();
        } else if (choice.add === "Add Department") {
            addDepartment();
        } else if (choice.add == "Add Roles") {
            addRoles();
        }
    })
}
//add department
function addDepartment() {
    inquirer.prompt({
        type:"input",
        name:"department",
        message:"Enter department name."
    })
    .then((answer)=> {
        console.table(answer);
        connection.query(
            "INSERT INTO department SET ?",
            { 
                title: answer.title,
            },
        (err, data) => {
                if(err) throw err;
                questions();
            }
        )
    });
}
//add roles
function addRoles () {
    connection.query("SELECT * FROM department", (err, data)=>{
        const departments = data.map((department)=> {
            return {
                name: department.title,
                value: department.id,
            }
        })
        inquirer.prompt([
            {
                type: "input",
                name: "roleTitle",
                message: "Enter role title.",
                },
                {
                type: "input",
                name: "salary",
                message: "Enter role salary.",
                },
                {
                type: "list",
                name: "department",
                message: "Enter role department:",
                choices: departments,
                },
        ])
        .then((answer)=> {
            console.table(answer);
            connection.query(
                "INSERT INTO roles SET ?",
                {
                    title: answer.roleTitle,
                    salary: answer.salary,
                    department_id: answer.department,
                },
                (err, data) => {
                    questions();
                }
            );
        });
    });
}

