// the require statement is a built in function thats globally available in node.js
// it allows the app.js file to access the fs modules functions through the fs assignment


const inquirer = require('inquirer');

const fs = require('fs');
const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', generatePage(name, github), err => {
//     if (err) throw err;
//     console.log('Portfolio complete! Checkout index.html to see the output!');
// });

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name', // name of the answer
            message: 'What is your name?', // question to the user
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("please enter your name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username',
            validate: gitHubUser => {
                if (gitHubUser) {
                    return true;
                } else {
                    console.log("please enter your github username!");
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({confirmAbout}) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};


const promptProject = portfolioData => {
    console.log(`
=================
Add a New Project
=================
`);
    // if there's no projects array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: projectName => {
                if (projectName) {
                    return true;
                } else {
                    console.log("please enter your project name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: projectDesc => {
                if (projectDesc) {
                    return true;
                } else {
                    console.log("please enter a description!");
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the Github link to your project. (Required)',
            validate: gitLink => {
                if (gitLink) {
                    return true;
                } else {
                    console.log("please enter your GitHub link!");
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData); 
        if (projectData.confirmAddProject) { // evaluating the user response to whether they wish to add more projects
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        const pageHTML = generatePage(portfolioData);

        fs.writeFile('./index.html', pageHTML, err => {
          if (err) throw new Error(err);

          console.log('Page created! Check out index.html in this directory to see it!');
    });
  });