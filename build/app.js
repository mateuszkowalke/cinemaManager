import express from 'express';
import dotenv from 'dotenv';
import { apiRoutes } from './routes/api';
import { authRoutes } from './routes/auth';
const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', (req, res) => res.send('Cinema manager api'));
apiRoutes(app);
authRoutes(app);
app.use(function (req, res) {
    res.status(404)
        .type('text')
        .send('Page Not Found');
});
export { app };
//# sourceMappingURL=app.js.map