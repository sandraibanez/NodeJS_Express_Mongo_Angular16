const router = require('express').Router();
const user = require('../../controllers/user.controller');
const verifyJWT = require('../../middleware/verifyJWT');
// console.log(verifyJWT);
// Authentication
router.post('/users/login', user.userLogin);

// Registration
router.post('/users', user.registerUser);

// Get Current User
router.get('/', verifyJWT, user.getCurrentUser);

// Update User
router.put('/', verifyJWT, user.updateUser);

module.exports = router;