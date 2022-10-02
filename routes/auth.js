const express = require('express');
const router = express.Router();

const userFacade = require('../models/userFacade');
const responseBody = require('../config/responseBody');

router.post("/register", async (req, res) => {
    const user = await userFacade.register(req.body);
    return res.json(responseBody(user));
})

router.post("/login", async (req, res) => {
    const user = await userFacade.login(req.body);
    return res.json(responseBody(user));
})

module.exports = router;

