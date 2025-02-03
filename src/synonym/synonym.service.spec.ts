/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { SynonymService } from './synonym.service';
import { PrismaService } from '../../prisma/prisma.service';
import { randomUUID } from 'crypto';

const DATABASE = [
  {
    id: randomUUID(),
    groupId: 1,
    word: 'hello',
  },
  {
    id: randomUUID(),
    groupId: 1,
    word: 'hi',
  },
];

describe('SynonymService', () => {
  let service: SynonymService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SynonymService,
        {
          provide: PrismaService,
          useValue: {
            synonym: {
              findUnique: ({ where: { word } }) => {
                return DATABASE.find((entry) => entry.word === word);
              },
              findMany: ({ where }: any) => {
                return DATABASE.filter(
                  (entry) =>
                    entry.id !== where.id.not.equals &&
                    entry.groupId === where.groupId,
                );
              },
            },
          },
        },
      ],
    }).compile();

    service = module.get<SynonymService>(SynonymService);
  });

  describe('getSynonym', () => {
    it('should query the synonym from the database', async () => {
      const synonym = await service.getSynonym('hello');
      expect(synonym).toMatchObject(DATABASE[0]);
      expect(synonym.related).toStrictEqual([DATABASE[1]]);
    });
  });
});
