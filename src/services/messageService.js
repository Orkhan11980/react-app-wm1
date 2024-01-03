
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');

const app = express();
app.use(bodyParser.json());


const dbPath = path.resolve(__dirname, 'db.json');

app.post('/messages', async (req, res) => {
  try {
    const { name, email, content } = req.body;
    
    const data = await fs.readJson(dbPath);
    
   
    data.messages.push({ name, email, content });

    
    await fs.writeJson(dbPath, data);

    res.status(200).send({ message: 'Message saved successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to save the message', error: error.toString() });
  }
});


app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
