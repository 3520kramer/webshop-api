const mongoose = require('mongoose');
const { Schema } = mongoose;

const partsSchema = new Schema({
    partName: { type: String, required: true },
})

const carsSchema = new Schema({
    name: { type: String },
    part1: { type: Schema.Types.ObjectId, ref: 'Part', required: true },
    part2: { type: Schema.Types.ObjectId, ref: 'Part', required: true }

})

const CarModel = mongoose.model('Car', carsSchema);
const PartModel = mongoose.model('Part', partsSchema);

module.exports.CarModel = CarModel;
module.exports.PartModel = PartModel;