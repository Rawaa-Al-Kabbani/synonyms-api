import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { StringFilter } from '../../shared/filters/string.filter';

@InputType()
export class WhereSynonymInput {
  @Field(() => StringFilter, { nullable: true })
  @IsOptional()
  @Type(() => StringFilter)
  word: StringFilter;
}
