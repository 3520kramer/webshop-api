const router = require('express').Router();

/* Example */
const CarModel = require('../models/mongodb/cars').CarModel;
router.get("/car", async (req, res) => {
    try {
        const car = await CarModel.find({}).populate('part1');
        const test = await CarModel.create({name: "Opel", part1: "60acedea714c44d127f27798", part2: "60acedfd714c44d127f27799"});
        console.log("car", car);
        console.log("test", test);

        res.status(200).send("Nice");
    } catch (error) {
        res.status(500).send({ errorOut: error.message });
    }
});

module.exports = router;

/* mongo db example */
/* 
 ** cars **
{
    "_id": {
        "$oid": "60acef04714c44d127f2779a"
    },
    "name": "Bimmer",
    "part1": {
        "$oid": "60acedea714c44d127f27798"
    },
    "part2": {
        "$oid": "60acedfd714c44d127f27799"
    }
}

 ** parts **
 {
    "_id": {
        "$oid": "60acedea714c44d127f27798"
    },
    "partName": "Wheel"
}
{
    "_id": {
        "$oid": "60acedfd714c44d127f27799"
    },
    "partName": "Brakes"
}

*/
