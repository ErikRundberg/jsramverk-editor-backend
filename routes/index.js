const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.json({
    status: 200,
    data: {
      endpoints: [
        {
          method: "GET",
          url: "/docs/:email",
          description: "Get all documents by email"
        },
        {
          method: "POST",
          url: "/docs",
          description: "Create/Update a document"
        },
        {
          method: "GET",
          url: "/docs/id/:id",
          description: "Get a specific document"
        },
        {
          method: "POST",
          url: "/user/register",
          description: "Register a user"
        },
        {
          method: "POST",
          url: "/user/login",
          description: "Login a user"
        }
      ]
    }
  });
});

module.exports = router;
