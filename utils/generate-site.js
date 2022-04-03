const fs = require('fs');

// JS promise
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            //if theres an error, reject the promise and send the error to the promises' .catch() method
            if (err) {
                reject(err);
                //return out of the function here to make sure the promise doesnt execute the resolve() function as well if there is an error
                return;
            }
            // if everything went well, resolve the promise and send the successful data to the .then() method
            resolve({
                ok: true,
                message: 'File Created!'
            });
        });
    }); 
};

const copyFile = function() {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'File successfully Copied!'
            });
        });
    });
};

module.exports = { writeFile, copyFile };