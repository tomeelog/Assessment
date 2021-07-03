const router = require('express').Router();
const verify = require('./verifyToken');


router.get('/', verify, (req, res) => {

    res.json({
        post: { title: 'my title', description: 'my description' }
    });
});

module.exports = router; 