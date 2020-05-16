const express = require("express")

const router = express.Router()

const projectModel = require('../data/helpers/projectModel')

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
    projectModel.getProjectActions()
      .then((projects) => {
          if (req.params)
        res.status(200).json({ message: "All projects on server", projects })
      })
      .catch((err) => {})
  })

  module.exports = router