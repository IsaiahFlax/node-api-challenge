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

  module.exports = router