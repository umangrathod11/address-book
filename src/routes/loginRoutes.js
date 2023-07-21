const express = require('express');
const router = express.Router();
const uuidv4 = require("uuid");
const fs = require('fs');
const { LOGIN_FILE_PATH } = require('../constants/general');

/* use proper hashing algo in future */
const getHashedPassword = (plainPassword) => plainPassword;
const generateLoginToken = (phoneNumber) => {
  const p1 = `${Math.random() * phoneNumber}`.replace(".", "");
  const p2 = `${Math.random() * phoneNumber}`.replace(".", "");
  return `${p1}_${uuidv4.v4()}_${p2}`;
};

router.post('/v1', (req, res) => {
  const { phoneNumber, password } = req.body;
  fs.readFile(LOGIN_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Internal Server Error' });
      return;
    }

    const users = JSON.parse(data);
    const user = users.find((u) => u.phoneNumber === phoneNumber);

    if (!user) {
      res.status(400).send({ message: 'Invalid id or password' });
      return;
    }

    const hashedPassword = getHashedPassword(password);
    if (user.hashedPassword !== hashedPassword) {
      res.status(400).send({ message: 'Invalid id or password' });
      return;
    }

    const loginToken = generateLoginToken(phoneNumber);
    user.token = loginToken;

    // Write token in the login data
    fs.writeFile(LOGIN_FILE_PATH, JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
        return;
      }
      res.json({ loginToken, phoneNumber });
    });
  });


});


module.exports = router;