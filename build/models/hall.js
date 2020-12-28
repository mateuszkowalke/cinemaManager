import { model, Schema } from 'mongoose';
import { Screening } from './screening';
const hallSchema = new Schema({
    name: String,
    screenings: [{ type: Schema.Types.ObjectId, ref: 'Screening' }]
});
hallSchema.pre("deleteOne", function () {
    return Promise.all(this.screenings.map((doc) => {
        Screening.findByIdAndDelete(doc);
    })).catch(err => console.error(err));
});
export const Hall = model('Hall', hallSchema);
//# sourceMappingURL=hall.js.map