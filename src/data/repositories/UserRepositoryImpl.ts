// 5. src/data/repositories/UserRepositoryImpl.ts
import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import { UserDto, mapUserDtoToDomain } from "../dtos/UserDto";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly baseUrl: string = "https://api.yourdomain.com/v1") {}

  async getUserById(id: string): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    const data: UserDto = await response.json();
    return mapUserDtoToDomain(data);
  }
}
