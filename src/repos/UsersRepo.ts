import { EntityRepository, AbstractRepository } from 'typeorm';
import { User } from '../entity/User';

@EntityRepository(User)
export class UsersRepo extends AbstractRepository<User> {
  // async findByUsername(username: string) {
  //   return this.repository.findOne({ username });
  // }
}
