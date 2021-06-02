var express = require('express');
var router = express.Router();
const {getAllTasks, executeTask} = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  res.send(getAllTasks());
});

router.post('/:tid/complete', function(req, res, next) {
  const tid = req.params.tid;
  executeTask(tid);
  res.send();
});

module.exports = router;
