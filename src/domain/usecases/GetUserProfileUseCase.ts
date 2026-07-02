// 3. src/domain/usecases/GetUserProfileUseCase.ts
import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";

export class GetUserProfileUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<User> {
    if (!userId.trim()) {
      throw new Error("User ID cannot be empty");
    }
    return this.userRepository.getUserById(userId);
  }
}
