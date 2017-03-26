var express = require('express');
var router = express.Router();
let cassandra = require('cassandra-driver');

let client = new cassandra.Client({contactPoints: ['192.168.1.10']});
client.connect(function(err, result) {
  console.log('addsubscriber: cassandra connected');
});

/* GET subscribers listing. */
router.get('/', function(req, res, next) {
  res.render('addsubscriber');
});

/* POST Add Subscriber */
router.post('/', function(req, res) {
  let id = cassandra.types.uuid();

  let upsertSubscriber = 'insert into people.subscribers(id, email, first_name, last_name) values(?, ?, ?, ?)';

  client.execute(upsertSubscriber,
    [id, req.body.email, req.body.first_name, req.body.last_name],
    function(err, result) {
      if (err) res.status(404).send({msg: err});
      else {
        console.log('Subscriber Added');
        res.redirect('/');
      }
  });
});

module.exports = router;
