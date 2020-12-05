const mongoose = require('mongoose');
const Hall = require('./hall');

const screeningSchema = new mongoose.Schema({
    film: String,
    beginning: Date,
    end: Date
});

screeningSchema.pre("deleteOne", { document: true }, function (next) {
    return Hall.findOne({ screenings: this.id })
        .then(doc => doc.screenings.pull(this.id))
        .catch(err => next(err));
});

module.exports = mongoose.model('Screening', screeningSchema);