import UserModel from '../models/user-model';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import mailService from './mail-service';
import tokenService from './token-service';
import UserDto from '../dtos/user-dto';

class UserService {
	async registration(email: string, password: string) {
		const candidate = await UserModel.findOne({ email });
		if (candidate) {
			throw new Error(`Пользователь с почтовым адресом ${email} уже существует`);
		}
		const hashPassword = await bcrypt.hash(password, 3);
const activationLink = uuidv4();
		
		const user = await UserModel.create({ email, password: hashPassword, activationLink });
		await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}
}

export default new UserService();