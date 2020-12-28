import { hallsGet, hallPost, hallGet, hallPut, hallDelete } from '../controllers/hall_controller';
import { screeningsGet, screeningPost, screeningGet, screeningPut, screeningDelete } from '../controllers/screening_controller';
import { verifyToken } from '../utils/verify_token';
export const apiRoutes = function (app) {
    app.route('/api/halls/')
        //get all halls
        .get(hallsGet)
        //post new hall
        .post(verifyToken, hallPost);
    app.route('/api/hall/:hall_id')
        //get single hall
        .get(hallGet)
        //edit hall -> to make any changes to screenings in the hall use screening methods
        .put(verifyToken, hallPut)
        //delete hall
        .delete(verifyToken, hallDelete);
    app.route('/api/screenings/:hall_id')
        //get all screenings for specified hall
        .get(screeningsGet)
        //post screening for specified hall
        .post(verifyToken, screeningPost);
    app.route('/api/screening/:screening_id')
        //get single screening
        .get(screeningGet)
        //edit screening -> to change screening's hall specify hall in request's body
        .put(verifyToken, screeningPut)
        //delete screening
        .delete(verifyToken, screeningDelete);
};
//# sourceMappingURL=api.js.map