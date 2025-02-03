import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Synonym {
  @Field(() => String)
  id: string;

  @Field(() => String)
  groupId: string;

  @Field(() => String)
  word: string;

  @Field(() => [Synonym], { nullable: true })
  related?: Synonym[];
}
