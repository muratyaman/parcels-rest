import { EntityRepository, AbstractRepository } from 'typeorm';
import { User } from '../entity/User';

@EntityRepository(User)
export class UsersRepo extends AbstractRepository<User> {
  
  async createAndSave(username: string, password: string, firstName: string, lastName: string) {
    const user = new User();
    user.username = username;
    user.passwordHash = password; // TODO: create hash
    user.firstName = firstName;
    user.lastName = lastName;
    return this.manager.save(user);
  }
  
  async findByUsername(username: string) {
    return this.repository.findOne({ username });
  }
}
