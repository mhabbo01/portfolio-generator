// the require statement is a built in function thats globally available in node.js
// it allows the app.js file to access the fs modules functions through the fs assignment
const fs = require('fs');
const generatePage = require('./src/page-template.js');
const profileDataArgs = process.argv.slice(2, process.argv.length);
// console.log(profileDataArgs);
// const name = profileDataArgs[0];
// const github = profileDataArgs[1];
// or
const [name, github] = profileDataArgs;
// const printProfileData = profileDataArr => {
//     profileDataArr.forEach(profileItem => console.log(profileItem));
// };

// printProfileData(profileDataArgs);


// console.log(name, github);
// console.log(generatePage(name, github));
// fs.writefile takes three arguments
fs.writeFile('./index.html', generatePage(name, github), err => {
    if (err) throw err;
    console.log('Portfolio complete! Checkout index.html to see the output!');
});