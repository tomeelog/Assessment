const router = require('express').Router();
const verify = require('./verifyToken');
const jsonfile = require('jsonfile');

router.get('/getByDateRange', verify, (req, res) => {

    const file = '../data.1625230922.json';
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const limit = req.query.limit;
    const page = req.query.page;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    console.log("ReponseData", { li: limit, pa: page })

    // read json file
    const JsonData = jsonfile.readFileSync(file);
    // const start_time = "2021-01-02T00:22:38.190Z";
    // const end_time = "2021-01-02T00:34:59.819Z";

    var result = JsonData.alarms.filter(item => new Date(item.timestamp).getTime() > new Date(startDate).getTime() && new Date(item.timestamp) < new Date(endDate).getTime())
    const response = result.slice(startIndex, endIndex);
    console.log("ReponseData", response);
    res.json(response);

});

router.get('/GetLocationById', verify,(req, res) => {
    const file = '../data.1625230922.json';
    const locationId = req.query.id;
    console.log("locationId", locationId);
    const JsonData = jsonfile.readFileSync(file);
    var result = JsonData.locations.filter(item => item.id == locationId);

    console.log("ReponseData", result);

    res.json(result);
});


module.exports = router; 