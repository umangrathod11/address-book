const express = require('express');
const router = express.Router();
const fs = require('fs');
const { USERS_FILE_PATH } = require('../constants/general');


router.get("/", (req, res) => {
    res.json({
        message: 'This is reports route'
    })
});

module.exports = router;