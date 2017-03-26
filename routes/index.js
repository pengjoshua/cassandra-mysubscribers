let express = require('express');
let router = express.Router();
let cassandra = require('cassandra-driver');

let client = new cassandra.Client({contactPoints: ['192.168.1.10']});
client.connect(function(err, result) {
  console.log('index: cassandra connected');
});

let getAllSubscribers = 'select * from people.subscribers';

/* GET home page. */
router.get('/', function(req, res, next) {
  client.execute(getAllSubscribers, [], function(err, result) {
    if (err) res.status(404).send({msg: err});
    else {
      res.render('index', {
        subscribers: result.rows
      });
    }
  });
});

module.exports = router;
