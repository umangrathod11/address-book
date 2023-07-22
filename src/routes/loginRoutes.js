const express = require('express');
const router = express.Router();
const uuidv4 = require("uuid");
const SHA256 = require("crypto-js/sha256");
const _ = require("lodash");
const { LOGIN_FILE_PATH, COOKIES_NAME } = require('../constants/general');
const { readDataFromFile, writeDataToFile } = require('../model/files');

const getHashedPassword = (plainPassword) => SHA256(plainPassword).toString();
const generateLoginToken = (phoneNumber) => {
  const p1 = `${Math.random() * phoneNumber}`.replace(".", "");
  const p2 = `${Math.random() * phoneNumber}`.replace(".", "");
  const batakaa = [p1, ...uuidv4.v4().split("-"), p2, ...uuidv4.v4().split("-")];
  return _.shuffle(batakaa).join("-");
};

router.post('/v1', async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    let users = await readDataFromFile(LOGIN_FILE_PATH);
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
    res.cookie(COOKIES_NAME.PHONE, phoneNumber);
    res.cookie(COOKIES_NAME.TOKEN, loginToken);
    await writeDataToFile(LOGIN_FILE_PATH, users);
    res.json({ loginToken, phoneNumber });
} catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
    return;
}
});


module.exports = router;