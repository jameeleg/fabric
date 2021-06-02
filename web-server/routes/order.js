var express = require('express');
var router = express.Router();
const {createTask} = require('../db');

/* GET users listing. */
router.post('/', function(req, res, next) {
	const products = req.body;
	products.forEach(p => {
		createTask(p, 'PICK');
	})	
	res.send();
});

module.exports = router;
