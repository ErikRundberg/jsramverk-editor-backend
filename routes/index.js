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
          url: "/docs",
          description: "Get all documents"
        },
        {
          method: "POST",
          url: "/docs",
          description: "Create/Update a document"
        },
        {
          method: "GET",
          url: "/docs/:id",
          description: "Get a specific document"
        }
      ]
    }
  });
});

module.exports = router;
