const mongoose = require('mongoose');

const screeningSchema = new mongoose.Schema({
    film: String,
    beginning: Date,
    end: Date
});

module.exports = mongoose.model('Screening', screeningSchema);