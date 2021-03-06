import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import {AppRouter} from './AppRouter';
// import router from './routes/authRoutes';
import './controllers/AuthController';
const app = express();
const port = 3011;

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({keys: ['']}));

// router.get('/status', (req: Request, res: Response) => {
// 	return res.status(200).send('Live ....');
// });
app.use(AppRouter.getInstance());

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
