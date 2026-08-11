import type { HttpRoute } from "@pine/server";
import { checkRelationship } from "@/features/authorization/routes/checkRelationship";

export const authorizationRoutes: HttpRoute[] = [checkRelationship];
export { checkRelationship } from "@/features/authorization/routes/checkRelationship";
