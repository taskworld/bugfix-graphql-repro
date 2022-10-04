import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "userId")')
export class User {
  @Field(() => ID)
  userId: string;

  @Field()
  email: string;

  @Field(() => Date)
  createdAt: Date;

  static from({ userId, email }: { userId: string; email: string }) {
    const user = new User();

    user.userId = userId;
    user.email = email;
    user.createdAt = new Date();

    return user;
  }
}
