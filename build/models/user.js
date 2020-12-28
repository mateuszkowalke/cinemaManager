import { model, Schema } from 'mongoose';
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        min: 8,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now()
    }
});
export const User = model('User', userSchema);
//# sourceMappingURL=user.js.map