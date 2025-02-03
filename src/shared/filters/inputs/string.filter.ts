import { InputType, PickType } from '@nestjs/graphql';
import { FilterGenerator } from '../filter.generator';

@InputType()
export class StringFilter extends PickType(
  FilterGenerator<string>(String),
  ['startsWith'],
  InputType,
) {}
