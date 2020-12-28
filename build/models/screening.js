import { model, Schema } from 'mongoose';
import { Hall } from './hall';
const screeningSchema = new Schema({
    film: String,
    beginning: Date,
    end: Date
});
screeningSchema.pre("deleteOne", function (next) {
    return Hall.findOne({ screenings: this._id })
        .then((doc) => doc.screenings.pull(this._id))
        .catch(err => next(err));
});
export const Screening = model('Screening', screeningSchema);
//# sourceMappingURL=screening.js.map