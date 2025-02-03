import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StringFilter {
  @Field(() => String, { nullable: true })
  startsWith?: string;
}
