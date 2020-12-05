const Hall = require('../models/hall');

exports.hallsGet = (req, res) => {
    Hall.find({})
        .then(docs => res.json(docs))
        .catch(err => console.error(err));
};

exports.hallPost = (req, res) => {
    if (!req.body.name) {
        return res.send(`Couldn't save hall - need all data about hall to save.`)
    }
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
    if (!req.body.name) {
        return res.send(`Couldn't save hall - need all data about hall to save.`)
    }
    Hall.findById(req.params.hall_id)
        .then(doc => {
            if (!doc) {
                return { error: true, message: `No hall with id ${req.params.hall_id} found.` };
            } else {
                doc.name = req.body.name;
                return doc.save();
            }
        })
        .then(result => {
            if (result.error) {
                res.send(result.message);
            } else {
                res.send(`Successfully updated hall: ${result.name}.`);
            }
        })
        .catch(err => console.error(err));
};

exports.hallDelete = (req, res) => {
    Hall.findById(req.params.hall_id)
        .populate('screenings')
        .then(doc => {
            if (!doc) {
                return { error: true, message: `There's no hall with specified id.` };
            } else if (hasCollidingScreenings(doc)) {
                return { error: true, message: `Can't delete hall - it has future screenings.` };
            } else {
                return doc.deleteOne();
            }
        })
        .then(result => {
            if (result.error) {
                res.send(result.message);
            } else {
                res.send(`Successfully deleted hall.`);
            }
        })
        .catch(err => console.error(err));
};

function hasCollidingScreenings(hall) {
    return !hall.screenings.every(screening => screening.end < Date.now());
}