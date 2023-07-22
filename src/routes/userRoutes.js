const express = require('express');
const router = express.Router();
const uuidv4 = require("uuid");
const { USERS_FILE_PATH } = require('../constants/general');
const { readDataFromFile, writeDataToFile } = require('../model/files');



router.get('/', async (req, res) => {
    try {
        const users = await readDataFromFile(USERS_FILE_PATH);
        res.json(users);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
        return;
    }
});

router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const users = await readDataFromFile(USERS_FILE_PATH);
        const user = users.find((u) => u.id === userId);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
        return;
    }
});

router.post('/', async (req, res) => {
    const newUser = req.body;
    newUser.id = generateId('user_');
    try {
        let users = await readDataFromFile(USERS_FILE_PATH);
        users = [newUser, ...users];
        await writeDataToFile(USERS_FILE_PATH, users);
        res.json(newUser);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
        return;
    }
});

router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    updatedUser.id = userId;

    try {
        let users = await readDataFromFile(USERS_FILE_PATH);
        const userIndex = users.findIndex((u) => u.id === userId);
        if (userIndex === -1) {
            res.status(404).send('User not found');
            return;
        }
        const userToReplace = { ...users[userIndex], ...updatedUser };
        // Update the user
        users[userIndex] = userToReplace;
        await writeDataToFile(USERS_FILE_PATH, users);
        res.json(userToReplace);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
        return;
    }
});

router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const users = await readDataFromFile(USERS_FILE_PATH);
        const userIndex = users.findIndex((u) => u.id === userId);
        if (userIndex === -1) {
            res.status(404).send('User not found');
            return;
        } 
        const userToBeDeleted = users[userIndex];
        // Remove the user
        users.splice(userIndex, 1);
        await writeDataToFile(USERS_FILE_PATH, users);
        res.json(userToBeDeleted);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
        return;
    }
});


function generateId(prefix = '_') {
    return prefix + uuidv4.v4();
}

module.exports = router;