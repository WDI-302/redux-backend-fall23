var express = require('express');
var router = express.Router();
const usersController = require('./controller/usersController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login-test', (req,res) => res.send({
  firstname: 'Paul',
  lastname: 'Atreides',
  email: 'paul@arrakis.com'
}))

router.post('/register', usersController.register)



module.exports = router;
