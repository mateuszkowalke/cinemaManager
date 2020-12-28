import { IScreening } from '../models/screening';
import { Hall, IHall } from '../models/hall';
import { IError } from '../utils/error';
import { Request, Response } from "express";

export const hallsGet = (req: Request, res: Response): void => {
    Hall.find({})
        .then(docs => res.json(docs))
        .catch(err => console.error(err));
};

export const hallPost = (req: Request, res: Response): Response => {
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

export const hallGet = (req: Request, res: Response): void => {
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

export const hallPut = (req: Request, res: Response): Response => {
    if (!req.body.name) {
        return res.send(`Couldn't save hall - need all data about hall to save.`)
    }
    Hall.findById(req.params.hall_id)
        .then((doc: IHall): Promise<IHall | IError> => {
            if (!doc) {
                return Promise.resolve({ kind: 'ierror', error: true, message: `No hall with id ${req.params.hall_id} found.` });
            } else {
                doc.name = req.body.name;
                return doc.save();
            }
        })
        .then((result: IError | IHall): void => {
            if (result.kind === 'ierror') {
                res.send(result.message);
            } else {
                res.send(`Successfully updated hall: ${result.name}.`);
            }
        })
        .catch(err => console.error(err));
};

export const hallDelete = (req: Request, res: Response): void => {
    Hall.findById(req.params.hall_id)
        .populate('screenings')
        .then((doc: IHall): Promise<IHall | IError> => {
            if (!doc) {
                return Promise.resolve({ kind: 'ierror', error: true, message: `There's no hall with specified id.` });
            } else if (hasCollidingScreenings(doc)) {
                return Promise.resolve({ kind: 'ierror', error: true, message: `Can't delete hall - it has future screenings.` });
            } else {
                return doc.deleteOne();
            }
        })
        .then(result => {
            if (result.kind === 'ierror') {
                res.send(result.message);
            } else {
                res.send(`Successfully deleted hall.`);
            }
        })
        .catch(err => console.error(err));
};

function hasCollidingScreenings(hall: IHall) {
    return !hall.screenings.every((screening: IScreening) => screening.end.getTime() < Date.now());
}