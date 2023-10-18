const router = require('express').Router();
const user = require('../../controllers/user.controller');
const verifyJWT = require('../../middleware/verifyJWT');
// console.log(verifyJWT);
// Authentication
router.post('/login', user.userLogin);

// Registration
router.post('/register', user.registerUser);

// Get Current User
router.get('/', verifyJWT, user.getCurrentUser);

// Update User
router.put('/settings', verifyJWT, user.updateUser);

module.exports = router;