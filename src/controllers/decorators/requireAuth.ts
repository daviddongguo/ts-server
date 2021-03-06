import {NextFunction, Request, Response} from 'express';

export function requireAuth(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	if (req.session && req.session.isLoggedIn === true) {
		next();
		return;
	}

	res.send('Not permitted');
}

export function logger(req: Request, res: Response, next: NextFunction): void {
	console.log('Request was made!!!');
	console.log(req.body);
	console.log(req.session?.isLoggedIn);
	next();
}

export function bodyValidate(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	if (req.body.email && req.body.password) {
		next();
		return;
	}

	res.send('email or password can not be empty');
}
