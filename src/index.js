const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const uuidv4 = require("uuid");
const { loginRoutes, userRoutes, reportsRoutes } = require("./routes");
const { readDataFromFile } = require('./model/files');
const { LOGIN_FILE_PATH, COOKIES_NAME } = require('./constants/general');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())

// Start the server
app.listen(port, () => {
 console.log(`Server listening on port ${port} at ${new Date().toString()}`);
});

// Request ID middleware
app.use((req, res, next) => {
    req.requestId = `${uuidv4.v4()}-${uuidv4.v4()}`;
    res.setHeader("X-request-id", req.requestId);
    next();
});

const authenticateReq = async (req, res, next) => {
    const { originalUrl } = req;
    console.log('originalUrl in authenticateReq :- ', originalUrl);
    console.log('req cookies : ', req.cookies);
    const ckToken = req.cookies[COOKIES_NAME.TOKEN];
    const ckuserPn = req.cookies[COOKIES_NAME.PHONE];
    console.log({
        ckToken,
        ckuserPn,
        t: typeof ckuserPn,
    });
    try {
        const loginUsers = await readDataFromFile(LOGIN_FILE_PATH);
        console.log(loginUsers);
        const index = loginUsers.findIndex(u => u.phoneNumber === ckuserPn && u.token === ckToken);
        console.log('index ', index);
        if (index === -1) {
            res.status(403).send({ message: 'Unauthorized request' });
            return;
        }
        next();
    } catch (error) {
        console.log('Error in authenticateReq ', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

app.use("/login", loginRoutes);
app.use("/users", authenticateReq, userRoutes);
app.use("/reports", authenticateReq, reportsRoutes);