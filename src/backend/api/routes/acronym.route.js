const router = require('../../express-router');
const { protect } = require('./../../middleware/auth.middleware');
const {
  getAcronyms,
  getAcronym,
  getAcronymsByRandomCount,
  createAcronym,
  updateAcronym,
  deleteAcronym,
} = require('./../controller/acronym.controller');

router.route('/').get(getAcronyms);
router.route('/:acronym').get(getAcronym);
router.route('/random/:count').get(getAcronymsByRandomCount);
router.route('/').post(createAcronym);
router.route('/:acronym').put(protect, updateAcronym);
router.route('/:acronym').delete(protect, deleteAcronym);

module.exports = router;
