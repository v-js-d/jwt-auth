import type { Request, Response, NextFunction } from 'express';
import userService from '../service/user-service';
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error';

class UserController {
	async registration(req: Request, res: Response, next: NextFunction) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
			}
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
			const userData = await userService.login(email, password);
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json(token);
		} catch (error) {
			next(error);
		}
	}

	async activate(req: Request, res: Response, next: NextFunction) {
		try {
			const activationLink = req.params.link;
			await userService.activate(activationLink);
			return res.redirect(process.env.CLIENT_URL || 'http://localhost:3000');
		} catch (error) {
			next(error);
		}
	}

	async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userService.refresh(refreshToken);
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await userService.getUsers();
			return res.json(users);
		} catch (error) {
			next(error);
		}
	}
}

export default new UserController();
