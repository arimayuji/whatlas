import { User } from "../entities/user.model";

export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(id: string, data: Partial<User>): Promise<void>;
  delete(id: string): Promise<void>;
}
