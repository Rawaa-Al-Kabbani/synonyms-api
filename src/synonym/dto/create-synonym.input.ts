import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional, Matches } from 'class-validator';

const WORD_PATTERN = /[a-zA-Z]+/;

@InputType()
export class CreateSynonymInput {
  @Field(() => String)
  @Matches(WORD_PATTERN)
  @Transform(({ value }) => (value as string).toLowerCase())
  word: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @Matches(WORD_PATTERN, { each: true })
  @Transform(({ value }) =>
    (value as string[]).map((item) => item.toLowerCase()),
  )
  synonyms?: string[];
}
