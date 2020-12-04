const Hall = require('../models/hall');
const Screening = require('../models/screening');


exports.hallsGet = (req, res) => {
    Hall.find({})
        .then(docs => res.json(docs))
        .catch(err => console.error(err));
};

exports.hallPost = (req, res) => {
    const newHall = new Hall({
        name: req.body.name
    });
    newHall.save()
        .then(doc => res.send(`Successfully created new hall: ${doc.name}.`))
        .catch(err => console.error(err));
};

exports.hallGet = (req, res) => {
    Hall.findById(req.params.hall_id)
        .populate('screenings')
        .then(doc => {
            if (!doc) {
                res.send(`No hall with id: ${req.params.hall_id} found.`);
            } else {
                res.json(doc);
            }
        })
        .catch(err => console.error(err));
};

exports.hallPut = (req, res) => {
    Hall.findById(req.params.hall_id)
        .then(doc => {
            if (!doc) {
                return `No hall with id ${req.params.hall_id} found.`;
            } else {
                doc.name = req.body.name;
                doc.save();
                return `Successfully updated hall: ${doc.name}.`;
            }
        })
        .then(response => res.send(response))
        .catch(err => console.error(err));
};

exports.hallDelete = (req, res) => {
    Hall.findById(req.params.hall_id)
        .populate('screenings')
        .then(doc => {
            if (!doc) {
                return `There's no hall with specified id.`;
            } else if (hasCollidingScreenings(doc)) {
                return `Can't delete hall - it has future screenings.`;
            } else {
                doc.deleteOne();
                return `Successfully deleted hall.`;
            }
        })
        .then(response => res.send(response))
        .catch(err => console.error(err));
};

function hasCollidingScreenings(hall) {
    return !hall.screenings.every(screening => screening.end < Date.now());
}