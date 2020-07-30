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
