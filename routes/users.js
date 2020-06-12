var express = require('express');
var router = express.Router();
const Book = require('../models/book')
const Author = require('../models/author')
/* GET users listing. */
router.get('/', function(req, res, next) {
  Book.remove({})
  Author.remove({})
  res.send('respond with a resource');
});

module.exports = router;
