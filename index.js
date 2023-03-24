const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const generateHTML = require('./src/createHTML');

const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const DIST_DIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_DIR, 'team.html');

const createHTML = require('./src/createHTML');

const teamMembers = [];
const idArray = [];

function appMenu() {
    function createManager() {
        console.log('Please enter information about your team');
        
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'managerName',
                    message: "What is the team manager's name?",
                    validate: (answer) => {
                        if (answer !== '') {
                            return true;
                        }
                        return 'Please enter information or enter at least one character.';
                    },
                },
                {
                    type: 'input',
                    name: 'managerId',
                    message: 'What is the ID number for the manager?',
                    validate: answer => {
                        const pass = answer.match(/^[1-9]\d*$/);
                        if (pass) {
                            return true;
                        }
                        return 'Please enter a positive number';
                    },
                },
                {
                    type: 'input',
                    name: 'managerEmail',
                    message: "What is the Manager's Email?",
                    validate: answer => {
                        const pass = answer.match(/\S+@\S+\.\S+/);
                        if (pass) {
                            return true;
                        }
                        return 'Please enter a valid email address.';
                    },
                },
                {
                    type: 'input',
                    name: 'managerOfficeNumber',
                    message: 'What is the Office Number',
                    validate: (answer) => {
                        const pass = answer.match(/^[1-9]\d*$/);
                        if (pass) {
                            return true;
                        }
                        return 'Please enter a positive number.';
                    },
                }, 
            ])
            .then((answers) => {
             const manager = new Manager (
                answers.managerName,
                answers.managerId,
                answers.managerEmail,
                answers.managerOfficeNumber
            );
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            createTeam();

        });
    }

    function createTeam() {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'memberChoice',
                    message: 'Which type of member would you like to add?',
                    choices: [
                        'Engineer',
                        'Intern',
                        'Do not add',
                    ],
                },
            ])

            .then((userChoice) => {
                switch (userChoice.memberChoice) {
                    case 'Engineer':
                        addEngineer();
                        break;
                    case 'Intern':
                        addIntern();
                        break;
                    default:
                        buildTeam();

                }
            });
    }

    function addEngineer() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'engineerName',
                    message: "What is the Engineer's Name?",
                    validate: (answer) => {
                        if (answer !== '') {
                            return true;
                        }
                        return 'Please enter at least one character.';

                    },
                },
                {
                    type: 'input',
                    name: 'engineerId',
                    message: "What is the Engineer's ID?",
                    validate: (answer) => {
                        const pass = answer.match(/^[1-9]\d*$/);
                        if (pass) {
                            if (idArray.includes(answer)) {
                                return 'This ID is not available. Please enter a different ID number.';
                            } else {
                                return true;
                            }
                        }
                        return 'Please enter a number greater than zero.';
                    },
                },
                {
                    type: 'input',
                    name: 'engineerEmail',
                    message: "What is the Engineer's Email?",
                    validate: (answer) => {
                        const pass = answer.match(/\S+@\S+\.\S+/);
                        if (pass) {
                            return true;
                        }
                        return 'Please enter a valid email address.';
                    },

                },
                {
                    type: 'input',
                    name: 'engineerGithub',
                    message: "What is the Engineer's Github username?",
                    validate: (answer) => {
                        if (answer !== '') {
                            return true;
                        }
                        return "Please enter Github username.";
                    },
                },
            ])
            .then((answers) => {
                const engineer = new Engineer(
                    answers.engineerName,
                    answers.engineerId,
                    answers.engineerEmail,
                    answers.engineerGithub
                );
                teamMembers.push(engineer);
                idArray.push(answers.engineerId);
                createTeam();
            });
    }

    function addIntern() {
        inquirer
            .prompt([
                {
                type: 'input',
                name: 'internName',
                message: "What is the Intern's name?",
                validate: (answer) => {
                    if (answer !== '') {
                        return true;

                    }
                    return "Please enter Intern's name";

                },
            },
            {
                type: 'input',
                name: 'internId',
                message: "What is the Intern's ID?",
                validate: (answer) => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        if (idArray.includes(answer)) {
                            return 'This ID is not available. Please enter a different ID number.';
                        } else {
                            return true;
                        }
                    }
                    return 'Please enter a number greater than zero.';
                },
            },
            {
                type: 'input',
                name: 'InternEmail',
                message: "What is the Intern's Email?",
                validate: (answer) => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                        return true;
                    }
                    return 'Please enter a valid email address.';
                },
            },
            {
                type: 'input',
                name: 'internSchool',
                message: "What is the Intern's school?",
                validate: (answer) => {
                    if(answer !== '') {
            return true;
        }
        return "Please enter Intern's school";
    },
},
])
    .then((answers) => {
    const intern = new Intern(
        answers.internName,
        answers.internId,
        answers.internEmail,
        answers.interSchool
    );
    teamMembers.push(intern);
    idArray.push(answers.internId);
    createTeam();
});

}

function buildTeam() {
    if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR);
    }
    fs.writeFileSync(distPath, render(teamMembers), 'utf-8');
}

createManager();
}
appMenu();










