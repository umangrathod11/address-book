const express = require('express');
const router = express.Router();
const uuidv4 = require("uuid");
const fs = require('fs');
const SHA256 = require("crypto-js/sha256");
const _ = require("lodash");
const { LOGIN_FILE_PATH } = require('../constants/general');

const getHashedPassword = (plainPassword) => SHA256(plainPassword).toString();
const generateLoginToken = (phoneNumber) => {
  const p1 = `${Math.random() * phoneNumber}`.replace(".", "");
  const p2 = `${Math.random() * phoneNumber}`.replace(".", "");
  const batakaa = [p1, ...uuidv4.v4().split("-"), p2, ...uuidv4.v4().split("-")];
  return _.shuffle(batakaa).join("-");
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