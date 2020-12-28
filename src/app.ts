import { Application, Request, Response } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import { apiRoutes } from './routes/api';
import { authRoutes } from './routes/auth';

const app: Application = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response): Response => res.send('Cinema manager api'))
apiRoutes(app);
authRoutes(app);
app.use(function (req: Request, res: Response): void {
    res.status(404)
        .type('text')
        .send('Page Not Found');
});

export { app };