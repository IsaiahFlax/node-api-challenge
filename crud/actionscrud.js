const express = require("express")

const router = express.Router()

const actionModel = require('../data/helpers/actionModel')
const projectModel = require('../data/helpers/projectModel')

router.get("/:id", (req, res) => {
    // do your magic!
    const { id } = req.params
    projectModel.get(req.projectId)
    .then((projects) => {
      if (projects) {
        actionModel.get(id)
        .then((projects) => {
            if (projects) {
              res.status(200).json({ message: `Project number ${req.projectId}`, projects })
            } else {
              res.status(400).json({ message: `There is no action with this id ${req.projectId}`, projects })
        }})
        .catch((err) => {})
      } else {
        res.status(400).json({ message: 'There is no project with this id'})
  }})
  .catch((err) => {})

  })

          

  router.post("/", (req, res) => {
    req.body.project_id = req.projectId
    projectModel.get(req.projectId)
    .then((project) => {
      if (project){
          if(!req.body.description || !req.body.notes) {
            res.status(400).json({ message: "You need a name and description to add a project"})
          } else {
            actionModel.insert(req.body).then((action) => {
              res.status(200).json(action)
            }).catch()
          }
      } else {
        res.status(400).json({ message: 'There is no project with this id'})
      }
    }).catch((err) => {})
  })

  router.put('/:id', (req, res) => {
    req.body.project_id = req.projectId
    projectModel.get(req.projectId)
    .then((project) => {
      if (project){
          if(!req.body.description || !req.body.notes) {
            res.status(400).json({ message: "You need a name and description to add a project"})
          } else {
            actionModel.update(req.params.id, req.body).then((action) => {
              res.status(200).json(action)
            }).catch()
          }
      } else {
        res.status(400).json({ message: 'There is no project with this id'})
      }
    }).catch((err) => {})
  })

  router.delete('/:id', (req, res) => {
    req.body.project_id = req.projectId
    projectModel.get(req.projectId).then(((project) => {
      if (project) {
        actionModel.get(req.params.id)
        .then((project) => {
            if(project){
            actionModel.remove(req.params.id).then((remove) => {
              res.status(200).json({ message: 'You deleted something!'})
            }).catch()
          } else {
            res.status(400).json({ message: `There is no action with this id ${req.projectId}`, project })
      }
          }         
          ).catch()
      } else {
        res.status(400).json({ message: 'There is no project with this id'})
      }
    })).catch()
  })

module.exports = router