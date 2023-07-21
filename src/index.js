const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { loginRoutes, userRoutes } = require("./routes");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors())

// Start the server
app.listen(port, () => {
 console.log(`Server listening on port ${port}`);
 console.log({ loginRoutes, userRoutes })
});

app.use("/login", loginRoutes);
app.use("/users", userRoutes);