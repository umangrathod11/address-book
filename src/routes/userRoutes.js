const express = require('express');
const router = express.Router();
const uuidv4 = require("uuid");
const fs = require('fs');
const { USERS_FILE_PATH } = require('../constants/general');


router.get('/', (req, res) => {
    // Read users from JSON file
    fs.readFile(USERS_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
            return;
        }

        const users = JSON.parse(data);
        res.json(users);
    });
});

router.get('/:id', (req, res) => {
    const userId = req.params.id;

    // Read users from JSON file
    fs.readFile(USERS_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
            return;
        }

        const users = JSON.parse(data);
        const user = users.find((u) => u.id === userId);

        if (!user) {
            res.status(404).send('User not found');
            return;
        }

        res.json(user);
    });
});

router.post('/', (req, res) => {
    const newUser = req.body;

    // Read users from JSON file
    fs.readFile(USERS_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
            return;
        }

        newUser.id = generateId('user_');
        const users = JSON.parse(data);
        users.push(newUser);

        // Write updated users to JSON file
        fs.writeFile(USERS_FILE_PATH, JSON.stringify(users), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send({ message: 'Internal Server Error' });
                return;
            }

            res.json(newUser);
        });
    });
});

router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    updatedUser.id = userId;

    // Read users from JSON file
    fs.readFile(USERS_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
            return;
        }

        let users = JSON.parse(data);
        const userIndex = users.findIndex((u) => u.id === userId);

        if (userIndex === -1) {
            res.status(404).send('User not found');
            return;
        }

        const userToReplace = { ...users[userIndex], ...updatedUser };
        // Update the user
        users[userIndex] = { ...users[userIndex], ...userToReplace };

        // Write updated users to JSON file
        fs.writeFile(USERS_FILE_PATH, JSON.stringify(users), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send({ message: 'Internal Server Error' });
                return;
            }

            res.json(userToReplace);
        });
    });
});

router.delete('/:id', (req, res) => {
    const userId = req.params.id;

    // Read users from JSON file
    fs.readFile(USERS_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
            return;
        }

        let users = JSON.parse(data);
        const userIndex = users.findIndex((u) => u.id === userId);

        if (userIndex === -1) {
            res.status(404).send('User not found');
            return;
        }

        const userToBeDeleted = users[userIndex];
        // Remove the user
        users.splice(userIndex, 1);

        // Write updated users to JSON file
        fs.writeFile(USERS_FILE_PATH, JSON.stringify(users), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send({ message: 'Internal Server Error' });
                return;
            }

            res.json(userToBeDeleted);
        });
    });
});


function generateId(prefix = '_') {
    return prefix + uuidv4.v4();
}

module.exports = router;