import { Screening } from '../models/screening';
import { Hall } from '../models/hall';
export const screeningsGet = (req, res) => {
    Hall.findById(req.params.hall_id)
        .populate('screenings')
        .then((doc) => {
        if (!doc) {
            res.send(`No hall with id ${req.params.hall_id} found.`);
        }
        else {
            res.json(doc.screenings);
        }
    })
        .catch(err => console.error(err));
};
export const screeningPost = (req, res) => {
    if (!(req.body.film && req.body.beginning && req.body.end)) {
        return res.send(`Couldn't save screening - need all data about screening to save.`);
    }
    const newScreening = new Screening({
        film: req.body.film,
        beginning: req.body.beginning,
        end: req.body.end
    });
    Hall.findById(req.params.hall_id)
        .populate('screenings')
        .then((doc) => {
        if (!doc) {
            return Promise.resolve({ kind: 'ierror', error: true, message: `No hall with id ${req.params.hall_id} found.` });
        }
        else if (screeningsDontOverlap(doc, newScreening)) {
            doc.screenings.push(newScreening);
            return Promise.all([doc.save(), newScreening.save()]);
        }
        else {
            return Promise.resolve({ kind: 'ierror', error: true, message: `Couldn't save the new screening - it collides with another one in this hall.` });
        }
    })
        .then((result) => {
        if (!(result instanceof Array)) {
            res.send(result.message);
        }
        else {
            res.send(`Successfully created new screening: ${result[1].film}`);
        }
    })
        .catch(err => console.error(err));
};
export const screeningGet = (req, res) => {
    Screening.findById(req.params.screening_id)
        .then(doc => {
        if (!doc) {
            res.send(`No screening with id: ${req.params.screening_id} found.`);
        }
        else {
            res.json(doc);
        }
    })
        .catch(err => console.error(err));
};
export const screeningPut = (req, res) => {
    if (!(req.body.film && req.body.beginning && req.body.end)) {
        return res.send(`Couldn't save screening - need all data about screening to save.`);
    }
    Screening.findById(req.params.screening_id)
        .then((doc) => {
        if (!doc) {
            return Promise.resolve({ kind: 'ierror', error: true, message: `No screening with id: ${req.params.screening_id} found.` });
        }
        else {
            doc.film = req.body.film;
            doc.beginning = req.body.beginning;
            doc.end = req.body.end;
            if (req.body.hall) {
                return Promise.all([
                    Hall.findOne({ screenings: doc }),
                    Hall.findById(req.body.hall).populate('screenings')
                ]).then((halls) => {
                    if (halls[0].id === halls[1].id) {
                        return doc.save();
                    }
                    else if (screeningsDontOverlap(halls[1], doc)) {
                        halls[0].screenings.pull(doc.id);
                        halls[1].screenings.push(doc.id);
                        return Promise.all([halls[0].save(), halls[1].save(), doc.save()]);
                    }
                    else {
                        return Promise.resolve({ kind: 'ierror', error: true, message: `Couldn't update screening - it collides with another one in the destination hall.` });
                    }
                });
            }
            return doc.save();
        }
    })
        .then((result) => {
        if (!(result instanceof Array) && result.kind === 'ierror') {
            res.send(result.message);
        }
        else {
            res.send(`Successfully updated screening.`);
        }
    })
        .catch(err => console.error(err));
};
export const screeningDelete = (req, res) => {
    Screening.findByIdAndDelete(req.params.screening_id)
        .then((doc) => {
        if (!doc) {
            res.send(`There's no screening with specified id.`);
        }
        else {
            res.send(`Successfully deleted screening.`);
        }
    })
        .catch(err => console.error(err));
};
function screeningsDontOverlap(doc, newScreening) {
    return doc.screenings.every((screening) => screening.beginning >= newScreening.end || screening.end <= newScreening.beginning);
}
//# sourceMappingURL=screening_controller.js.map