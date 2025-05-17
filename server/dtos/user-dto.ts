class UserDto {
	email: string;
	id: string;
	isActivated: boolean;

	constructor(model: any) {
		this.email = model.email;
		this.id = model._id;
		this.isActivated = model.isActivated;
	}
}

export default UserDto;