import { Filter } from '../filters/filter.interface';

export type WhereInputType<T> = {
  [K in keyof Partial<T>]: Filter<T[K]>;
};
