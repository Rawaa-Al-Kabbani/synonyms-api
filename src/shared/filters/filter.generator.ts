import { Type } from '@nestjs/common';
import { Field, GqlTypeReference, InputType } from '@nestjs/graphql';
import { Filter } from './filter.interface';

export function FilterGenerator<T>(GqlType: GqlTypeReference): Type<Filter<T>> {
  @InputType({ isAbstract: true })
  abstract class FilterType implements Filter<T> {
    @Field(() => GqlType, { nullable: true })
    startsWith?: T;
  }
  return FilterType as Type<Filter<T>>;
}
