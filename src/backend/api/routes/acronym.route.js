const router = require('../../express-router');
const { getAcronyms, getAcronym } = require('./../controller/acronym.controller');

router.route('/acronym').get(getAcronyms);
router.route('/acronym/:acronym').get(getAcronym);

module.exports = router;
