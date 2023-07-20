const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require("uuid")
const fs = require('fs');
const cors = require('cors')

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors())

// Start the server
app.listen(port, () => {
 console.log(`Server listening on port ${port}`);
});


// Define routes
app.get('/users', (req, res) => {
 // Read users from JSON file
 fs.readFile('src/jsonData/users.json', 'utf8', (err, data) => {
   if (err) {
     console.error(err);
     res.status(500).send('Internal Server Error');
     return;
   }

   const users = JSON.parse(data);
   res.json(users);
 });
});

app.get('/users/:id', (req, res) => {
 const userId = req.params.id;

 // Read users from JSON file
 fs.readFile('src/jsonData/users.json', 'utf8', (err, data) => {
   if (err) {
     console.error(err);
     res.status(500).send('Internal Server Error');
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

app.post('/users', (req, res) => {
 const newUser = req.body;

 // Read users from JSON file
 fs.readFile('src/jsonData/users.json', 'utf8', (err, data) => {
   if (err) {
     console.error(err);
     res.status(500).send('Internal Server Error');
     return;
   }

   newUser.id = generateId('user_');
   const users = JSON.parse(data);
   users.push(newUser);

   // Write updated users to JSON file
   fs.writeFile('src/jsonData/users.json', JSON.stringify(users), (err) => {
     if (err) {
       console.error(err);
       res.status(500).send('Internal Server Error');
       return;
     }

     res.json(newUser);
   });
 });
});

app.put('/users/:id', (req, res) => {
 const userId = req.params.id;
 const updatedUser = req.body;
 updatedUser.id = userId;

 // Read users from JSON file
 fs.readFile('src/jsonData/users.json', 'utf8', (err, data) => {
   if (err) {
     console.error(err);
     res.status(500).send('Internal Server Error');
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
   fs.writeFile('src/jsonData/users.json', JSON.stringify(users), (err) => {
     if (err) {
       console.error(err);
       res.status(500).send('Internal Server Error');
       return;
     }

     res.json(userToReplace);
   });
 });
});

app.delete('/users/:id', (req, res) => {
 const userId = req.params.id;

 // Read users from JSON file
 fs.readFile('src/jsonData/users.json', 'utf8', (err, data) => {
   if (err) {
     console.error(err);
     res.status(500).send('Internal Server Error');
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
   fs.writeFile('src/jsonData/users.json', JSON.stringify(users), (err) => {
     if (err) {
       console.error(err);
       res.status(500).send('Internal Server Error');
       return;
     }

     res.json(userToBeDeleted);
   });
 });
});


function generateId(prefix = '_') {
  return prefix + uuidv4.v4();
}