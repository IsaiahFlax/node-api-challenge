const express = require("express")

const router = express.Router()

const projectModel = require('../data/helpers/projectModel')

const actionRouter = require('./actionscrud')
router.use('/:id/actions', actionRouter)

router.get("/", (req, res) => {
    // do your magic!
  
    projectModel.get()
      .then((projects) => {
        res.status(200).json({ message: "All projects on server", projects })
      })
      .catch((err) => {})
  })

  router.get("/:id", (req, res) => {
    // do your magic!
    const { id } = req.params
    projectModel.get(id)
      .then((projects) => {
          if (projects) {
            res.status(200).json({ message: `Project number ${projects.id}`, projects })
          } else {
            res.status(400).json({ message: 'There is no project with this id'})
      }})
      .catch((err) => {})
  })

  router.get("/:id/actions", (req, res) => {
    // do your magic!
    const { id } = req.params
    console.log(id)
    projectModel.getProjectActions(id)
      .then((actions) => {
        if (actions.length == 0){
        res.status(400).json({ message: "There are no actions for this project"})
        } else {
            res.status(200).json({ message: `These are the actions for project number ${id}`, actions })
        }
      })
      .catch((err) => {})
  })

  router.post('/', (req, res) => {
    if(!req.body.name || !req.body.description) {
        res.status(400).json({ message: "You need a name and description to add a project"})
    }  else {
    projectModel.insert(req.body)
    .then((project) => {
        res.status(200).json({ message: `You added a project. Number ${project.id}`, project})
    }).catch((err) => {})
    }
  })

  router.put('/:id', (req, res) => {
    if(!req.body.name || !req.body.description) {
        res.status(400).json({ message: "You need a name and description to add a project"})
    }  else {
    projectModel.update(req.params.id, req.body)
    .then((project) => {
        res.status(200).json({ message: `You updated project number ${project.id}`, project})
    }).catch((err) => {})
    }
  })

  router.delete('/:id', (req, res) => {
    projectModel.remove(req.params.id)
    .then((project) => {
        if(project){
        res.status(200).json(req.data)
      } 
      }         
      ).catch()
  })

  module.exports = router