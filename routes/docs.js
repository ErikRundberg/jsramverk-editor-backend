const express = require('express');
const router = express.Router();
const docFacade = require('../models/documentFacade');
const responseBody = require('../config/responseBody');

router.get("/", async (req, res) => {
  const docs = await docFacade.getDocs();
  res.json(responseBody(docs));
});

router.post("/", async (req, res) => {
  const newDocument = req.body;
  const result = await docFacade.saveDoc(newDocument);
  res.status(201).json(responseBody(result, 201));
});

router.get("/:id", async (req, res) => {
  const doc = await docFacade.openDoc(req.params.id);
  return res.json(responseBody(doc));
});

module.exports = router;