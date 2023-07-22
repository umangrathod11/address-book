const fs = require('fs');

const readDataFromFile = (filePath) => {
    const pr = new Promise((res, rej) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log('Error while reading file ', filePath, err);
                rej('Internal Server Error kkkkk');
                return;
            }
            res(JSON.parse(data));
            return;
        });
    });
    return pr;
};

const writeDataToFile = (filePath, data) => new Promise((res, rej) => {
        fs.writeFile(filePath, JSON.stringify(data, "", 2), (err) => {
            if (err) {
                console.log('Error while reading file ', filePath, err);
                rej('Internal Server Error');
                return;
            }
            res(true);
        });
});

module.exports = { readDataFromFile, writeDataToFile };
