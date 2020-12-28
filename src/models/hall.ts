import { model, Schema, Model, Document, Types } from 'mongoose';
import { IScreening, Screening } from './screening';

export interface IHall extends Document {
    kind: 'idocument';
    name: string;
    screenings: Types.Array<Types.ObjectId | IScreening>;
}

const hallSchema: Schema = new Schema({
    name: String,
    screenings: [{ type: Schema.Types.ObjectId, ref: 'Screening' }]
});

hallSchema.pre<IHall>("deleteOne", function () {
    return Promise.all(this.screenings.map((doc: IScreening) => {
        Screening.findByIdAndDelete(doc)
    })).catch(err => console.error(err));
});

export const Hall: Model<IHall> = model<IHall>('Hall', hallSchema);