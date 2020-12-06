const userController = require('../controllers/user_controller');

module.exports = function (app) {
    app.route('/api/register/')
        .post(userController.register);
    app.route('/api/login/')
        .post(userController.login);

};