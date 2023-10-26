const router = require('express').Router();

// const profileController = require('../../controllers/profilesController');

const verifyJWT = require('../../middleware/verifyJWT');
const profile = require('../../controllers/profilesController.js');

//api/profile
// router.param('username', profile.param_username);
router.get('/:username', verifyJWT, profile.getProfile);
router.post('/:username/follow', verifyJWT, profile.followUser);
router.delete('/:username/follow', verifyJWT, profile.unFollowUser);

module.exports = router;
