const express = require('express');

const server = express();
server.use(express.json());

const db = require('./data/accounts-model');

// your code here


server.get('/', async (req, res) => {
    try {
      const budget = await db.find(req.query.id);
      res.status(200).json({budget});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Cannot retrieve the accounts' });
    }
  });

  server.post('/', async (req, res) => {
    try {
        const projects = await db.add(req.body);
        res.status(201).json(projects);
      } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error adding the post',
        });
      }
});

  // server.get('/', (req, res) => {
  //   res.send(`<h2>Let's write some middleware!</h2>`)
  // });

module.exports = server;