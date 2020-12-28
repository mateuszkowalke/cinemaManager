import { register, login } from '../controllers/user_controller';
export const authRoutes = function (app) {
    app.route('/api/register/')
        .post(register);
    app.route('/api/login/')
        .post(login);
};
//# sourceMappingURL=auth.js.map