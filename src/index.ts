import express, {Request, Response} from 'express';
import router from './routes/loginRoutes';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
	return res.status(200).send('success');
});

app.use(router);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});