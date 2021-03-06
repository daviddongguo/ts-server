import {Request, Response} from 'express';
import {controller, get, post, use} from './decorators/';
import {bodyValidate, logger, requireAuth} from './decorators/requireAuth';

interface RequestWithBody extends Request {
	body: {[key: string]: string | undefined};
}

@controller('/auth')
class AuthController {
	@get('/login')
	getLogin(req: Request, res: Response): void {
		res.send(`<form method='POST'>
      <div>
        <label>Email</label>
        <input name='email' />
      </div>
      <div>
      <label>Password</label>
      <input name='password' />
    </div>
    <button>Submit</button>
    </form>`);
	}
	@get('/status')
	getStatus(req: Request, res: Response) {
		return res.status(200).send('Live ....');
	}
	@get('/')
	@use(logger)
	getRoot(req: Request, res: Response) {
		if (req.session && req.session.isLoggedIn) {
			return res.status(200).send('You are logged in.');
		}
		return res.send('<div><a href="/auth/login"> log in </a></div>');
	}
	@get('/logout')
	getLogout(req: Request, res: Response) {
		req.session = undefined;
		res.redirect('/auth/');
	}

	@get('/protected')
	@use(requireAuth)
	getProtedted(req: Request, res: Response) {
		res.send('Welcome to protected route, logged in user!');
	}

	@post('/login')
	@use(logger)
	@use(bodyValidate)
	postLogin(req: RequestWithBody, res: Response) {
		const {email, password} = req.body;
		if (email && password && email.length >= 4) {
			// mark this person as logged in
			req.session = {isLoggedIn: true};
			// redirect
			res.redirect('/auth/');
		}

		res.send('Invalid email or password');
	}
}
