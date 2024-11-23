import { createTRPCReact } from "@trpc/react-query";
import type { AuthRouter } from "../../../../services/auth/src";
import type { IssueTrackerRouter } from "../../../../services/issue-tracker/src";

export const authService = createTRPCReact<AuthRouter>();
export const issueTrackerService = createTRPCReact<IssueTrackerRouter>();
