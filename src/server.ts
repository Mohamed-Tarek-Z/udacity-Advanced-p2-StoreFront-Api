import express, { Request, Response } from 'express';
import routes from './routes/index';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.get('/', function (_req: Request, res: Response) {
   res.send('Hello World!');
});

app.listen(process.env.PORT, function () {
   console.log(`starting app on localHost:${process.env.PORT}`);
});

export default app;
