// 2. src/domain/repositories/UserRepository.ts
import { User } from "../entities/User";

export interface UserRepository {
  getUserById(id: string): Promise<User>;
}
