const router = require('express').Router();
const c = require('../controllers/designController');

router.get('/', c.list);
router.post('/', c.create);
router.get('/:id', c.get);
router.post('/:id/like', c.like);
router.post('/:id/comments', c.comment);
router.post('/:id/remix', c.remix);

module.exports = router;
