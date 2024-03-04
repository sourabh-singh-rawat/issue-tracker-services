import { EntityTarget, ObjectLiteral } from "typeorm";

const mockCreateQueryBuilder = jest
  .fn()
  .mockImplementation(
    (entityClass: EntityTarget<ObjectLiteral>, mainAlias: string) => {
      return {
        insert: mockInsert,
        update: mockUpdate,
      };
    },
  );
const mockInsert = jest.fn();
const mockUpdate = jest.fn();
const mockValues = jest.fn();
const mockWhere = jest.fn();
const mockSet = jest.fn();
const mockInto = jest.fn();
const mockReturning = jest.fn();
const mockExecute = jest.fn();

mockInsert.mockReturnValue({ into: mockInto });
mockInto.mockReturnValue({ values: mockValues });
mockValues.mockReturnValue({ returning: mockReturning });
mockReturning.mockReturnValue({ execute: mockExecute });
mockExecute.mockReturnValue({ generatedMaps: [{ id: "some-id" }] });

mockUpdate.mockReturnValue({ set: mockSet });
mockSet.mockReturnValue({ where: mockWhere });
mockWhere.mockReturnValue({
  execute: mockExecute,
  returning: mockReturning,
});

export const postgresTypeormStore = {
  connect: jest.fn(),
  createQueryBuilder: mockCreateQueryBuilder,
  createQueryRunner: jest.fn(),
  query: jest.fn(),
  transaction: jest.fn(),
};
