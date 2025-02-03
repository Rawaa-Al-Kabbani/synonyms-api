import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSynonymInput } from './dto/create-synonym.input';
import { Synonym } from './entities/synonym.entity';
import { WhereSynonymInput } from './dto/where-synonym.input';
import { PaginationInput } from './dto/pagination.input';

@Injectable()
export class SynonymService {
  constructor(private readonly prisma: PrismaService) {}

  async createSynonym({
    word,
    synonyms,
  }: CreateSynonymInput): Promise<Synonym> {
    await this.prisma.$transaction(async (transaction) => {
      let parent = await transaction.synonym.findUnique({
        where: {
          word,
        },
      });

      if (!parent) {
        parent = await transaction.synonym.create({
          data: {
            word,
          },
        });

        if (!parent) {
          throw new GraphQLError('Unable to create synonym');
        }
      }

      if (!synonyms?.length) {
        return {
          ...parent,
          related: [],
        };
      }

      const existingSynonyms = await transaction.synonym.findMany({
        where: {
          word: {
            in: synonyms,
          },
        },
      });

      if (existingSynonyms.length) {
        const updatedWords = await transaction.synonym.updateManyAndReturn({
          where: {
            groupId: {
              in: existingSynonyms.map((item) => item.groupId),
            },
          },
          data: {
            groupId: parent.groupId,
          },
        });

        const missingSynonyms = synonyms.filter(
          (synonym) => !updatedWords.find((item) => item.word === synonym),
        );

        if (missingSynonyms.length) {
          await transaction.synonym.createMany({
            data: missingSynonyms.map((word) => {
              return {
                groupId: parent.groupId,
                word: word,
              };
            }),
          });
        }
      } else {
        await transaction.synonym.createMany({
          data: synonyms.map((word) => {
            return {
              groupId: parent.groupId,
              word: word,
            };
          }),
        });
      }
    });

    return this.getSynonym(word);
  }

  getSynonyms(
    where: WhereSynonymInput,
    pagination: PaginationInput,
  ): Promise<Synonym[]> {
    return this.prisma.synonym.findMany({
      where,
      skip: pagination.offset,
      take: pagination.limit,
      orderBy: {
        word: 'asc',
      },
    });
  }

  async getSynonym(word: string): Promise<Synonym> {
    const parent = await this.prisma.synonym.findUnique({
      where: {
        word,
      },
    });

    if (!parent) {
      throw new Error('Invalid synonym');
    }

    const related = await this.prisma.synonym.findMany({
      where: {
        id: {
          not: {
            equals: parent.id,
          },
        },
        groupId: parent.groupId,
      },
      orderBy: {
        word: 'asc',
      },
    });

    return {
      ...parent,
      related,
    };
  }
}
