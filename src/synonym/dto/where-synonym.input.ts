import { Field, InputType } from '@nestjs/graphql';
import { Synonym } from '@prisma/client';
import { Filter } from '../../shared/filters/filter.interface';
import { StringFilter } from '../../shared/filters/inputs/string.filter';
import { WhereInputType } from '../../shared/inputs/where.type';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class WhereSynonymInput implements WhereInputType<Synonym> {
  [key: string]: Filter<unknown>;

  @Field(() => StringFilter, { nullable: true })
  @IsOptional()
  @Type(() => StringFilter)
  word: StringFilter;
}
