const Hall = require('../models/hall');
const Screening = require('../models/screening');

exports.screeningsGet = (req, res) => {
    Hall.findById(req.params.hall_id)
        .populate('screenings')
        .then(doc => res.send(doc.screenings))
        .catch(err => console.error(err));
};

exports.screeningPost = (req, res) => {
    const newScreening = new Screening({
        film: req.body.film,
        beginning: req.body.beginning,
        end: req.body.end
    });
    Hall.findById(req.params.hall_id)
        .populate('screenings')
        .then(doc => {
            if (screeningsDontOverlap(doc, newScreening)) {
                doc.screenings.push(newScreening);
                doc.save();
                newScreening.save();
                res.send(`Successfully created new screening: ${newScreening.film}`)
            } else {
                return res.send(`Couldn't save the new screening - it collides with another one in this hall.`)
            }
        })
        .catch(err => console.error(err));
}

exports.screeningGet = (req, res) => {
    Screening.findById(req.params.screening_id)
        .then(doc => res.send(doc))
        .catch(err => console.error(err));
};

exports.screeningPut = (req, res) => {

    Hall.findById({ _id: req.body.hall })
        .populate('screenings')
        .exec((err, hall) => {
            if (err) console.log(err);
            if (!hall) res.send(`No hall with id ${req.body.hall} found`)
            Screening.findById({ _id: req.params.screening_id })
                .populate('hall')
                .exec((err, doc) => {
                    if (err) console.log(err);
                    if (!doc) return res.send(`No screening with id ${req.body.screening_id} found`);
                    const beginning = new Date(req.body.beginning);
                    const end = new Date(req.body.end);
                    if (hall.screenings.every((screening) => screening.beginning >= end || screening.end <= beginning)) {
                        const oldHall = doc.hall;
                        doc.film = req.body.film;
                        doc.beginning = req.body.beginning;
                        doc.end = req.body.end;
                        doc.hall = req.body.hall;
                        hall.screenings.push(doc);
                        hall.save()
                            .then(doc.save((err, doc) => {
                                if (err) console.log(err);
                                res.redirect(`/api/screening/${req.params.screening_id}`)
                            }))
                            .then(Hall.findById(oldHall)
                                .then((old) => old.screenings.pull(doc.id)))
                    } else {
                        res.send(`Couldn't save the new screening - it collides with another one in this hall.`)
                    }
                });

        });
};

exports.screeningDelete = (req, res) => {
    //TODO pre delete hook to remove from hall (check if saving hall without object id deletes?)
    Screening.findByIdAndDelete({ _id: req.params.screening_id }, (err, doc) => {
        if (err) console.log(err);
        res.redirect(`/api/halls/`);
    })
};

function screeningsDontOverlap(doc, newScreening) {
    return doc.screenings.every((screening) => screening.beginning >= newScreening.end || screening.end <= newScreening.beginning);
}