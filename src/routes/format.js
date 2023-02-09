const express = require('express');
const router = express.Router();
const fs = require("fs");

router.get('/stats', function(req, res) {
    fs.readFile("./src/data.json", (err, data) => {
  if (err) throw err;

  let jsonData = JSON.parse(data);

  // @TODO: continue here

  res.send(jsonData)

    });
});

module.exports = router