// implement your API here
const express = require('express');

const db = require('./data/db.js')

const server = express();

server.use(express.json())

server.post('/api/users', (req,res) => {
    const Info = req.body;
    
    db.insert(Info)
     .then(user => {
         if (user){
             res.status(201).json(user)
         } else {
             res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
         }
     })
     .catch(() => {
        res.status(500).json({ error: "There was an error while saving the user to the database" });
      });
})

server.get('/api/users', (req,res) => {
    db.find()
     .then(users => {
         res.status(200).json(users)
     })
     .catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved." });
      });
})

server.get('/api/users/:id', (req,res) => {
    db.findById()
     .then(users => {
         if (users) {
         res.status(200).json(users)
         } else {
         res.status(404).json({ message: "The user with the specified ID does not exist." })
         }
     })
     .catch(() => {
        res.status(500).json({ error: "The users information could not be retrieved." });
      });
})

server.delete('/api/users/:id', (req,res) => {
const { id } = req.params

    db.remove(id)
    .then(deleted => {
        if(deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({message:  "The user with the specified ID does not exist."})
        }
    })
    .catch(() => {
        res.status(500).json({ error: "The user could not be removed" });
      });
})

server.put('/api/users/:id', (req,res) => {
    const id = req.params.id;
    const changes = req.body;

    Hubs.update(id, changes).then(updated => {
        if (updated) {
            res.status(200).json(updated)
        } else {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        }
    })
    .catch(error => {
        res.status(500).json(error);
      });
})

const port = 5000;
server.listen(port, () => console.log(`\n*** running on port ${port} ***\n`));
