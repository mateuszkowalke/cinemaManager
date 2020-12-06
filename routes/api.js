const hallController = require('../controllers/hall_controller');
const screeningController = require('../controllers/screening_controller');
const { verifyToken } = require('../utils/verify_token');

module.exports = function (app) {

    app.route('/api/halls/')
        //get all halls
        .get(hallController.hallsGet)
        //post new hall
        .post(verifyToken, hallController.hallPost);

    app.route('/api/hall/:hall_id')
        //get single hall
        .get(hallController.hallGet)
        //edit hall -> to make any changes to screenings in the hall use screening methods
        .put(verifyToken, hallController.hallPut)
        //delete hall
        .delete(verifyToken, hallController.hallDelete);

    app.route('/api/screenings/:hall_id')
        //get all screenings for specified hall
        .get(screeningController.screeningsGet)
        //post screening for specified hall
        .post(verifyToken, screeningController.screeningPost);

    app.route('/api/screening/:screening_id')
        //get single screening
        .get(screeningController.screeningGet)
        //edit screening -> to change screening's hall specify hall in request's body
        .put(verifyToken, screeningController.screeningPut)
        //delete screening
        .delete(verifyToken, screeningController.screeningDelete);

};