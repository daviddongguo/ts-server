import {Request, Response, Router} from 'express';

interface RequestWithBody extends Request {
	body: {[key: string]: string | undefined};
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
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
router.get('/', (req: Request, res: Response) => {
	if (req.session && req.session.isLoggedIn) {
		return res.status(200).send('You are logged in.');
	}
	return res.send('<div><a href="/login"> log in </a></div>');
});

router.post('/login', (req: RequestWithBody, res: Response) => {
	const {email, password} = req.body;
	if (email && password && email.length >= 4) {
		// mark this person as logged in
		req.session = {isLoggedIn: true};
		// redirect
		res.redirect('/');
	}

	res.send('Invalid email or password');
});

router.get('/logout', (req, res) => {
	req.session = undefined;
	res.redirect('/');
});

export default router;
