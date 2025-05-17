import type { Request, Response, NextFunction } from 'express';
import userService from '../service/user-service';

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
				try {
						const { email, password } = req.body;
						const userData = await userService.registration(email, password);
						res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
						return res.json(userData);
				} catch (error) {
						next(error);
				}
    }

		async login(req: Request, res: Response, next: NextFunction) {
			try {
					const { email, password } = req.body;
			} catch (error) {
					next(error);
			}
    }

		async logout(req: Request, res: Response, next: NextFunction) {
			try {
					const { refreshToken } = req.cookies;
			} catch (error) {
					next(error);
			}
    }

		async activate(req: Request, res: Response, next: NextFunction) {
			try {
					const activationLink = req.params.link;
			} catch (error) {
					next(error);
			}
    }

		async refresh(req: Request, res: Response, next: NextFunction) {
			try {
					const { refreshToken } = req.cookies;
			} catch (error) {
					next(error);
			}
    }

		async getUsers(req: Request, res: Response, next: NextFunction) {
			try {
				res.json(['123', '456', '789']);
					// const users = await User.find();
			} catch (error) {
					next(error);
			}
    }
}

export default new UserController();