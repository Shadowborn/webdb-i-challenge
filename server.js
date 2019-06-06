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

  server.get('/:id', async (req, res) => {
    try {
        console.log("get by id request")
        const budgetId = await db.findById(req.params.id);
        if (budgetId) {
            res.status(200).json(budgetId);
          } else {
            res.status(404).json({ message: 'User not found' });
          }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving posts by id'
        })
    }
});

  server.post('/', async (req, res) => {
    try {
        const createBudget = await db.add(req.body);
        res.status(201).json(createBudget);
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
      const updateBudget = await db.update(req.params.id, req.body);
      if (updateBudget) {
            res.status(200).json(updateBudget);
      } else {
            res.status(404).json({ message: 'That budget could not be found' });
      }
  } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error updating the budget' });
}
});

  // server.get('/', (req, res) => {
  //   res.send(`<h2>Let's write some middleware!</h2>`)
  // });

module.exports = server;