import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import {
  getConsentChallengeOptions,
  useAcceptConsentChallengeMutation,
} from "@generated/api/@tanstack/react-query.gen";
import { useConsentStore } from "@features/consent/stores";

export const ConsentForm = () => {
  useConsentStore();

  const { consent_challenge: consentChallenge } = useSearch({ from: "/(no-auth)/consent" });
  const autoAcceptStarted = useRef(false);

  const {
    data: challenge,
    isLoading,
    isError,
    error,
  } = useQuery({
    ...getConsentChallengeOptions({
      query: { consent_challenge: consentChallenge ?? "" },
    }),
    enabled: Boolean(consentChallenge),
  });

  const { mutateAsync: acceptConsent, isPending: isAccepting } =
    useAcceptConsentChallengeMutation();

  useEffect(() => {
    if (!challenge || autoAcceptStarted.current || !consentChallenge) {
      return;
    }

    autoAcceptStarted.current = true;

    void (async () => {
      const result = await acceptConsent({
        query: { consent_challenge: consentChallenge },
        body: {
          grantScope: challenge.requestedScope,
          remember: true,
          rememberFor: 3600,
        },
      });

      window.location.assign(result.redirectTo);
    })();
  }, [acceptConsent, challenge, consentChallenge]);

  if (!consentChallenge) {
    return (
      <Container maxWidth="sm">
        <Typography color="error">Missing consent challenge.</Typography>
      </Container>
    );
  }

  if (isError || (!isLoading && !challenge)) {
    return (
      <Container maxWidth="sm">
        <Typography color="error">
          {error instanceof Error ? error.message : "Unable to load consent request."}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Stack spacing={2} sx={{ alignItems: "center", py: 4 }}>
        <CircularProgress size={32} />
        <Typography color="text.secondary">
          {isLoading || isAccepting ? "Authorizing application…" : "Redirecting…"}
        </Typography>
      </Stack>
    </Container>
  );
};
