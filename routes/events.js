const router = require('express').Router();
const verify = require('./verifyToken');
const jsonfile = require('jsonfile');

router.get('/getByDateRange', verify, (req, res) => {

    // read json file
    const file = '../data.1625230922.json';
    const ff = jsonfile.readFileSync(file);
    const start_time = "2021-01-02T00:22:38.190Z";
    const end_time = "2021-01-02T00:34:59.819Z";
    console.log("JsonData",ff.alarms.filter(item=> new Date(item.timestamp).getTime() > new Date(start_time).getTime() && new Date(item.timestamp) < new Date(end_time).getTime()));

    
});

module.exports = router; 