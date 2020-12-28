import { model, Schema, Model, Document } from 'mongoose';
import { Hall, IHall } from './hall';

export interface IScreening extends Document {
    kind: 'iscreening';
    film: string;
    beginning: Date;
    end: Date;
}

const screeningSchema: Schema = new Schema({
    film: String,
    beginning: Date,
    end: Date
});

screeningSchema.pre<IScreening>("deleteOne", function (next) {
    return Hall.findOne({ screenings: this._id })
        .then((doc: IHall) => doc.screenings.pull(this._id))
        .catch(err => next(err));
});

export const Screening: Model<IScreening> = model<IScreening>('Screening', screeningSchema);