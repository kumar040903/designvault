const router = require('express').Router();
const c = require('../controllers/userController');

router.post('/login', c.login);
router.get('/:username', c.profile);
router.post('/:username/follow', c.follow);

module.exports = router;
