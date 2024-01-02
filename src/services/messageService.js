// messagesService.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Path to your JSON file
const dbPath = path.resolve(__dirname, 'db.json');

app.post('/messages', async (req, res) => {
  try {
    const { name, email, content } = req.body;
    // Read current messages from the file
    const data = await fs.readJson(dbPath);
    
    // Append new message
    data.messages.push({ name, email, content });

    // Write the updated messages back to the file
    await fs.writeJson(dbPath, data);

    res.status(200).send({ message: 'Message saved successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to save the message', error: error.toString() });
  }
});

// Replace 3000 with the port number you want your server to run on
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
