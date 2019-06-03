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

server.delete('/:id', async (req, res) => {
  try {
      const id = await db.remove(req.params.id);
      res.status(200).json({
          url: `/projects/${req.params.id}`,
          operation: `DELETE for project with id ${req.params.id}`
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({
          message: 'Error, cannot delete'
      })
  }
});

server.put('/:id', async (req, res) => {
  try {
      const project = await db.update(req.params.id, req.body);
      if (project) {
            res.status(200).json(project);
      } else {
            res.status(404).json({ message: 'That project could not be found' });
      }
  } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error updating the project' });
}
});

  // server.get('/', (req, res) => {
  //   res.send(`<h2>Let's write some middleware!</h2>`)
  // });

module.exports = server;