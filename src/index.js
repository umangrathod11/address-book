const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuidv4 = require("uuid");
const { loginRoutes, userRoutes, reportsRoutes } = require("./routes");

const app = express();
const port = 3000;

app.use(bodyParser.json());
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

app.use("/login", loginRoutes);
app.use("/users", userRoutes);
app.use("/reports", reportsRoutes);