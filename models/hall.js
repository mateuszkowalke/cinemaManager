const mongoose = require('mongoose');
const Screening = require('./screening');

const hallSchema = new mongoose.Schema({
    name: String,
    screenings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Screening' }]
});

hallSchema.pre("deleteOne", { document: true }, function (next) {
    this.screenings.map(doc => {
        Screening.findByIdAndDelete(doc.id)
            .catch(err => console.error(err));
    });
    next();
});

module.exports = mongoose.model('Hall', hallSchema);