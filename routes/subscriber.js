var express = require('express');
var router = express.Router();
let cassandra = require('cassandra-driver');

let client = new cassandra.Client({contactPoints: ['192.168.1.10']});
client.connect(function(err, result) {
  console.log('subscriber: cassandra connected');
});

let getSubscriberById = 'select * from people.subscribers where id = ?';

/* GET subscribers listing. */
router.get('/:id', function(req, res, next) {
  client.execute(getSubscriberById, [req.params.id], function(err, result) {
    if (err) res.status(404).send({msg: err});
    else {
      res.render('subscriber', {
        id: result.rows[0].id,
        email: result.rows[0].email,
        first_name: result.rows[0].first_name,
        last_name: result.rows[0].last_name
      });
    }
  });
});

let deleteSubscriber = 'delete from people.subscribers where id = ?';

router.delete('/:id', function(req, res) {
  client.execute(deleteSubscriber, [req.params.id], function(err, result) {
    if (err) res.status(404).send({msg: err});
    else {
      res.json(result);
    }
  });
});

module.exports = router;
