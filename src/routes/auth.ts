import { register, login } from '../controllers/user_controller';
import { Application } from 'express';

export const authRoutes = function (app: Application): void {
    app.route('/api/register/')
        .post(register);
    app.route('/api/login/')
        .post(login);
};