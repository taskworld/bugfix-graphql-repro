import { Args, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { User } from './app.schema';

const MOCK_DATA: User[] = [
  User.from({ userId: '0', email: 'julien.b@taskworld.com' }),
  User.from({ userId: '1', email: 'peon.y@taskworld.com' }),
];

@Resolver(() => User)
export class AppResolver {
  @ResolveReference()
  async resolveReference(ref: { __typename: 'User'; userId: string }) {
    return this.findUserById(ref.userId);
  }

  @Query(() => [User])
  async findAllUsers() {
    return MOCK_DATA;
  }

  @Query(() => User)
  async findUserById(@Args('userId', { type: () => String }) userId: string) {
    return MOCK_DATA.find((user) => user.userId === userId);
  }
}
