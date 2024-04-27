const express = require('express');
const router = express.router();

router.get('/products', (req, res) => {
  res.send('Hello World!');
});


module.exports = router;