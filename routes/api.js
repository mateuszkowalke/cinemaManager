const hallController = require('../controllers/hall_controller');
const screeningController = require('../controllers/screening_controller');

module.exports = function (app) {

    app.route('/api/halls/')
        //get all halls
        .get(hallController.hallsGet)
        //post new hall
        .post(hallController.hallPost);

    app.route('/api/hall/:hall_id')
        //get single hall
        .get(hallController.hallGet)
        //edit hall -> to make any changes to screenings in the hall use screening methods
        .put(hallController.hallPut)
        //delete hall
        .delete(hallController.hallDelete);

    app.route('/api/screenings/:hall_id')
        //get all screenings for specified hall
        .get(screeningController.screeningsGet)
        //post screening for specified hall
        .post(screeningController.screeningPost);

    app.route('/api/screening/:screening_id')
        //get single screening
        .get(screeningController.screeningGet)
        //edit screening -> to change screening's hall specify hall in request's body
        .put(screeningController.screeningPut)
        //delete screening
        .delete(screeningController.screeningDelete);

};