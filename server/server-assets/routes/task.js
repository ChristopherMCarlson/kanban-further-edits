let router = require('express').Router()
let Tasks = require('../models/task')


//GETS ALL TASKS BELONGING TO LIST
router.get('/:listId', (req, res, next) => {
  Tasks.find({ listId: req.params.listId })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})


//MAKES A NEW TASK
router.post('/:listId', (req, res, next) => {
  req.body.authorId = req.session.uid
  req.body.listId = req.params.listId
  Tasks.create(req.body)
    .then(newList => {
      res.send(newList)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})


//CREATES A NEW COMMENT ON SPECIFIC TASK
router.post('/:')


//UPDATES TASKS TO NEW LISTS
router.put('/:taskId', (req, res, next) => {
  Tasks.findByIdAndUpdate(req.params.taskId, req.body)
    .then(() => res.send({
      message: 'Task updated!'
    }))
})


//DELETES A SINGLE TASK
router.delete('/:id', (req, res, next) => {
  Tasks.findById(req.params.id)
    .then(list => {
      if (!list.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      Tasks.findByIdAndRemove(req.params.id)
        .then(data => {
          res.send('DELORTED')
        })
    })
})

module.exports = router