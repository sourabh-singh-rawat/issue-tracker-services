const mockCreateQueryBuilder = jest.fn();
const mockInsert = jest.fn();
const mockUpdate = jest.fn();
const mockValues = jest.fn();
const mockWhere = jest.fn();
const mockSet = jest.fn();
const mockInto = jest.fn();
const mockReturning = jest.fn();
const mockExecute = jest.fn();

mockCreateQueryBuilder.mockReturnValue({
  insert: mockInsert,
  update: mockUpdate,
});

mockInsert.mockReturnValue({ into: mockInto });
mockInto.mockReturnValue({ values: mockValues });
mockValues.mockReturnValue({ returning: mockReturning });
mockReturning.mockReturnValue({ execute: mockExecute });
mockExecute.mockReturnValue({ generatedMaps: [{ id: "some-id" }] });

mockUpdate.mockReturnValue({ set: mockSet });
mockSet.mockReturnValue({ where: mockWhere });
mockWhere.mockReturnValue({ returning: mockReturning });

export const databaseService = {
  connect: jest.fn(),
  createQueryBuilder: mockCreateQueryBuilder,
  createQueryRunner: jest.fn(),
  query: jest.fn(),
  transaction: jest.fn(),
};
