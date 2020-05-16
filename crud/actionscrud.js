const express = require("express")

const router = express.Router()

const actionModel = require('../data/helpers/actionModel')

router.get("/:id", (req, res) => {
    // do your magic!
    const { id } = req.params
    actionModel.get(id)
      .then((projects) => {
          if (projects) {
            res.status(200).json({ message: `Project number ${req.projectId}`, projects })
          } else {
            res.status(400).json({ message: 'There is no project with this id'})
      }})
      .catch((err) => {})
  })

  router.post("/", (req, res) => {
    req.body.project_id = req.projectId
    actionModel.insert(req.body)
      .then((action) => {
        res.status(200).json({action});
      })
      .catch();
  });

module.exports = router