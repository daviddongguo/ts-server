import {NextFunction, Request, Response, Router} from 'express';

interface RequestWithBody extends Request {
	body: {[key: string]: string | undefined};
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
	if (req.session && req.session.isLoggedIn) {
		next();
		return;
	}

	res.status(403).send('Not permitted');
}

const router = Router();

router.get('/auth/status', (req: Request, res: Response) => {
	return res.status(200).send('Live ....');
});

router.get('/auth/', (req: Request, res: Response) => {
	if (req.session && req.session.isLoggedIn) {
		return res.status(200).send('You are logged in.');
	}
	return res.send('<div><a href="/auth/login"> log in </a></div>');
});

router.get('/auth/login', (req: Request, res: Response) => {
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
});

router.post('/auth/login', (req: RequestWithBody, res: Response) => {
	const {email, password} = req.body;
	if (email && password && email.length >= 4) {
		// mark this person as logged in
		req.session = {isLoggedIn: true};
		// redirect
		res.redirect('/auth/');
	}

	res.send('Invalid email or password');
});

router.get('/auth/logout', (req, res) => {
	req.session = undefined;
	res.redirect('/auth/');
});

router.get('/auth/protected', requireAuth, (req: Request, res: Response) => {
	res.send('Welcome to protected route, logged in user!');
});

export default router;
