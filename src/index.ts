import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import express, {Request, Response} from 'express';
import router from './routes/loginRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({keys: ['']}));

app.get('/status', (req: Request, res: Response) => {
	return res.status(200).send('Live ....');
});

app.use(router);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
