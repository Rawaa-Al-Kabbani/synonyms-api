import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { SynonymService } from './synonym.service';
import { Synonym } from './entities/synonym.entity';
import { CreateSynonymInput } from './dto/create-synonym.input';
import { WhereSynonymInput } from './dto/where-synonym.input';
import { PaginationInput } from './dto/pagination.input';

@Resolver(() => Synonym)
export class SynonymResolver {
  constructor(private readonly synonymService: SynonymService) {}

  @Mutation(() => Synonym)
  createSynonym(@Args('input') createSynonymInput: CreateSynonymInput) {
    return this.synonymService.createSynonym(createSynonymInput);
  }

  @Query(() => [Synonym], { name: 'synonyms' })
  synonyms(
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination: PaginationInput,

    @Args('where', { type: () => WhereSynonymInput, nullable: true })
    synonymWhereInput: WhereSynonymInput,
  ): Promise<Synonym[]> {
    return this.synonymService.getSynonyms(synonymWhereInput, pagination);
  }

  @Query(() => Synonym, { name: 'synonym' })
  synonym(
    @Args('word', { type: () => String }) word: string,
  ): Promise<Synonym> {
    return this.synonymService.getSynonym(word);
  }
}
