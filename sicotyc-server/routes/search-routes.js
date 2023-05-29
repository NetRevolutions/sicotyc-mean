/**
 * Search
 * Path: '/api/search/'
 */

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { searchAll, searchByCollection } = require('../controllers/search-controller')

const router = Router();

router.get('/:fieldToSearch',
    [
        validateJWT   
    ],
    searchAll
);

router.get('/collection/:collection/:fieldToSearch', 
    [
        validateJWT
    ],
    searchByCollection);

module.exports = router;