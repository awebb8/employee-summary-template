const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamArray = [];

promptUser();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
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
            message: "What is your manager's email?"
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
        console.log("Employee Added");
        teamArray.push(manager);
        buildTeam(response.teamMember);
    }).catch((err) => {console.log(err)});
}


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


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
            message: "What is your engineer's email?"
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
            console.log("Employee Added");
            teamArray.push(engineer);
            buildTeam(response.teamMember);
        });
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
            // type: "input",
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
        console.log("Employee Added");
        teamArray.push(intern);
        buildTeam(response.teamMember);
    });
    } else {
        // const renderEmployees = render(team);
        fs.writeFile(outputPath, render(teamArray), function(err) {
        if (err) throw err;
        console.log("It worked!");
        });
    }
}

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
