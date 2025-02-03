import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsOptional, Min } from 'class-validator';
import { GraphQLInt } from 'graphql';

@InputType()
export class PaginationInput {
  @Field(() => GraphQLInt, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number;

  @Field(() => GraphQLInt, { nullable: true, defaultValue: 5 })
  @IsOptional()
  @IsInt()
  @Min(0)
  limit?: number = 5;
}
