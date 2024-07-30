import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from 'src/auth/auth.user.dto';

@Injectable()
export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	getAllUsers() {
		return this.usersRepository.getAllUsers();
	}

	getUserById(id: string) {
		return this.usersRepository.getUserById(id);
	}

	getUserByEmail(email: string) {
		return this.usersRepository.getUserByEmail(email);
	}

	updateUser(id: string, data: UpdateUserDto) {
		return this.usersRepository.updateUser(id, data);
	}

	disableUser(id: string) {
		return this.usersRepository.disableUser(id);
	}
}
