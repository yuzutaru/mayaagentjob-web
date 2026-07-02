// 4. src/data/dtos/UserDto.ts
import { User } from "../../domain/entities/User";

export interface UserDto {
  user_id: string;
  full_name: string;
  email_address: string;
}

export const mapUserDtoToDomain = (dto: UserDto): User => ({
  id: dto.user_id,
  name: dto.full_name,
  email: dto.email_address,
});
