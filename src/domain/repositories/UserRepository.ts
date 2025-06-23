import { User } from "../entities/user.model";

export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByPhone(phone: string): Promise<User | null>;
  create(user: User): Promise<void>;
  update(id: string, data: Partial<User>): Promise<void>;
  delete(id: string): Promise<void>;
}
