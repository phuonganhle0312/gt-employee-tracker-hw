const inquirer = require("inquirer");
const mysql = require("mysql");
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