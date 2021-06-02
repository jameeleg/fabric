var express = require('express');
var router = express.Router();
const {getAllStock} = require('../db');


/* GET users listing. */
router.get('/', function(req, res, next) {
	const arr = getAllStock();
  	res.send(arr);
});

module.exports = router;
