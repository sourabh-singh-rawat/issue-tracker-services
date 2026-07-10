import { createFileRoute } from "@tanstack/react-router";
import { EmailVerificationPage } from "@features/auth";

export const Route = createFileRoute("/email-verification")({
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : undefined,
  }),
  component: EmailVerificationPage,
});
