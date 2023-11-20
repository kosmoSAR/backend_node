const express = require("express");

const router = express.Router();

router.get('/users', (req, res) => {
  //la ruta sería localhost:3000/users?limit=10&offset=200
  const {limit, offset} = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    })
  } else {
    res.send('No hay parámetros')
  }
});

module.exports = router;
