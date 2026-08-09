import type { Unit } from "@/db";

export type CreateUnitInput = {
  code: string;
  name: string;
  symbol?: string | null;
  isActive?: boolean;
};

export type UpdateUnitInput = {
  code?: string;
  name?: string;
  symbol?: string | null;
  isActive?: boolean;
};

export interface IUnitService {
  createUnit(input: CreateUnitInput): Promise<Unit>;
  getUnitById(id: string): Promise<Unit>;
  listUnits(): Promise<Unit[]>;
  updateUnit(id: string, input: UpdateUnitInput): Promise<Unit>;
  deleteUnit(id: string): Promise<void>;
}
