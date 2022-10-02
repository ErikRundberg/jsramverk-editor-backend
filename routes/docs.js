const express = require('express');
const router = express.Router();
const docFacade = require('../models/documentFacade');
const responseBody = require('../config/responseBody');


router.get("/:email", async (req, res) => {
  const docs = await docFacade.getDocs(req.params.email);

  res.json(responseBody(docs));
});

router.post("/", async (req, res) => {
  const result = await docFacade.saveDoc(req.body);

  res.status(201).json(responseBody(result, 201));
});

router.get("/id/:id", async (req, res) => {
  const doc = await docFacade.openDoc(req.params.id);

  res.json(responseBody(doc));
});

router.post("/add", async (req, res) => {
  const result = await docFacade.addUser(req.body);

  res.status(201).json(responseBody(result, 201));
})

module.exports = router;
