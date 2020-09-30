const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// array that will contain all employee objects
const teamArray = [];

promptUser();
// Write code to use inquirer to gather information about the development team manager,
function promptUser() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your manager's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your manager's email?",
            validate: function(email) {
                if(email === "" || email === null || email === undefined) {
                    console.log("\nPlease enter valid email");
                }
                else if(email.includes("@") === false || email.includes(".com") === false) {
                    console.log("\nPlease enter valid email");
                }
                else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "number",
            message: "What is your manager's office number?",
        },
        {
            type: "list",
            name: "teamMember",
            message: "Which type of team member would you like to add?",
            choices: ["Engineer", "Intern", "I don't want to add any more team members"]
        }
    ])
    .then(response => {
        const manager = new Manager(response.name, response.id, response.email, response.number);
        teamArray.push(manager);
        buildTeam(response.teamMember);
    }).catch((err) => {console.log(err)});
}

// this code is written to ask different questions via inquirer depending on employee type.
function buildTeam(response) {
    if (response === "Engineer") {
        inquirer.prompt ([
        {
            type: "input",
            name: "name",
            message: "What is your engineer's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your engineer's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your engineer's email?",
            validate: function(email) {
                if(email === "" || email === null || email === undefined) {
                    console.log("\nPlease enter valid email");
                }
                else if(email.includes("@") === false || email.includes(".com") === false) {
                    console.log("\nPlease enter valid email");
                }
                else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "github",
            message: "What is your engineer's GitHub username?"
        },
        {
            type: "list",
            name: "teamMember",
            message: "Which type of team member would you like to add?",
            choices: ["Engineer", "Intern", "I don't want to add any more team members"]
        }
        ]).then(function(response) {
            const engineer = new Engineer(response.name, response.id, response.email, response.github);
            teamArray.push(engineer);
            buildTeam(response.teamMember);
        }).catch((err) => {console.log(err)});
    } else if (response === "Intern") {
        inquirer.prompt ([
        {
            type: "input",
            name: "name",
            message: "What is your intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your intern's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your intern's email?",
            validate: function(email) {
                if(email === "" || email === null || email === undefined) {
                    console.log("\nPlease enter valid email");
                }
                else if(email.includes("@") === false || email.includes(".com") === false) {
                    console.log("\nPlease enter valid email");
                }
                else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "school",
            message: "What is your intern's school?"
        },
        {
            type: "list",
            name: "teamMember",
            message: "Which type of team member would you like to add?",
            choices: ["Engineer", "Intern", "I don't want to add any more team members"]
        }
    ]).then(function(response) {
        const intern = new Intern(response.name, response.id, response.email, response.school);
        teamArray.push(intern);
        buildTeam(response.teamMember);
    }).catch((err) => {console.log(err)});
    // After the user has input all employees desired, call the `render` function
    // The render function will generate and return a block of HTML including templated divs for each employee!
    // create an HTML file using the HTML returned from the `render` function. Now write it to a file named `team.html` in the
    // `output` folder. Use the variable `outputPath` above target this location.
    } else {
        fs.writeFile(outputPath, render(teamArray), function(err) {
        if (err) throw err;
        console.log("All employees have been added.");
        });
    }
}