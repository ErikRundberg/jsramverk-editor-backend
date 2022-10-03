const express = require('express');
const router = express.Router();
const emailFacade = require('../models/emailFacade');
const responseBody = require('../config/responseBody');


router.post("/", async (req, res) => {
    const email = await emailFacade.sendEmail(req.body);

    res.json(responseBody(email));
});

module.exports = router;
