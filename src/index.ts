import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import express, {Request, Response} from 'express';
import router from './routes/authRoutes';

const app = express();
const port = 3011;

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({keys: ['']}));

router.get('/status', (req: Request, res: Response) => {
	return res.status(200).send('Live ....');
});
app.use(router);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
