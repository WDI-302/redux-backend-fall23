var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login-test', (req,res) => res.send({
  firstname: 'Paul',
  lastname: 'Atreides',
  email: 'paul@arrakis.com'
}))

module.exports = router;
