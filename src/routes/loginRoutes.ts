import {Request, Response, Router} from 'express';

const router = Router();

router.get('/login', (req: Request, res: Response) => {
	res.send('login');
});

export default router;
