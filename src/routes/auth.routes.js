let express = require('express');
const { registerController, loginController } = require('../controllers/auth.controller');
let router = express.Router();

router.post('/register', registerController,(req, res) => {
   
});

router.post('/login', loginController,(req, res) => {
   
});

module.exports = router;