import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSearch } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import {
  useAcceptConsentChallengeMutation,
  useGetConsentChallengeQuery,
} from "@generated/api/@tanstack/react-query.gen";
import { useConsentStore } from "@features/consent/stores";

export const ConsentForm = () => {
  useConsentStore();

  const { consent_challenge: consentChallenge } = useSearch({ from: "/(no-auth)/consent" });
  const autoAcceptStarted = useRef(false);

  const consentChallengeQuery = useGetConsentChallengeQuery({
    query: { consent_challenge: consentChallenge ?? "" },
  });

  const acceptConsentMutation = useAcceptConsentChallengeMutation();

  useEffect(() => {
    const challenge = consentChallengeQuery.data;
    if (!challenge || autoAcceptStarted.current || !consentChallenge) {
      return;
    }

    autoAcceptStarted.current = true;

    void (async () => {
      const result = await acceptConsentMutation.mutateAsync({
        query: { consent_challenge: consentChallenge },
        body: {
          grantScope: challenge.requestedScope,
          remember: true,
          rememberFor: 3600,
        },
      });

      window.location.assign(result.redirectTo);
    })();
  }, [acceptConsentMutation.mutateAsync, consentChallengeQuery.data, consentChallenge]);

  if (!consentChallenge) {
    return (
      <Container maxWidth="sm">
        <Typography color="error">Missing consent challenge.</Typography>
      </Container>
    );
  }

  if (
    consentChallengeQuery.isError ||
    (!consentChallengeQuery.isLoading && !consentChallengeQuery.data)
  ) {
    return (
      <Container maxWidth="sm">
        <Typography color="error">
          {consentChallengeQuery.error instanceof Error
            ? consentChallengeQuery.error.message
            : "Unable to load consent request."}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Stack spacing={2} sx={{ alignItems: "center", py: 4 }}>
        <CircularProgress size={32} />
        <Typography color="text.secondary">
          {consentChallengeQuery.isLoading || acceptConsentMutation.isPending
            ? "Authorizing application…"
            : "Redirecting…"}
        </Typography>
      </Stack>
    </Container>
  );
};
