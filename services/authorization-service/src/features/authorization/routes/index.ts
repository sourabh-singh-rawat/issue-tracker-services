import type { HttpRoute } from "@pine/server";
import { checkRelationship } from "@/features/authorization/routes/checkRelationship";
import { deleteRelationship } from "@/features/authorization/routes/deleteRelationship";
import { ensureRelationship } from "@/features/authorization/routes/ensureRelationship";
import { listRelationships } from "@/features/authorization/routes/listRelationships";

export const authorizationRoutes: HttpRoute[] = [
  checkRelationship,
  ensureRelationship,
  deleteRelationship,
  listRelationships,
];
export { checkRelationship } from "@/features/authorization/routes/checkRelationship";
export { ensureRelationship } from "@/features/authorization/routes/ensureRelationship";
export { deleteRelationship } from "@/features/authorization/routes/deleteRelationship";
export { listRelationships } from "@/features/authorization/routes/listRelationships";
