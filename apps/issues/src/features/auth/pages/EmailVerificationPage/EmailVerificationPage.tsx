import MuiGrid from "@mui/material/Grid";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useVerifyVerificationLinkMutation } from "@generated/gql";
import { useSnackbar } from "@common";

export function EmailVerificationPage() {
  const [pageMessage, setPageMessage] = useState(
    "Please wait while we verify your email",
  );
  const navigate = useNavigate();
  const { token } = useSearch({ strict: false });
  const messageBar = useSnackbar();
  const { mutateAsync: verifyVerificationLink } =
    useVerifyVerificationLinkMutation();

  useEffect(() => {
    if (!token || typeof token !== "string") return;

    void (async () => {
      try {
        const response = await verifyVerificationLink({
          input: { token },
        });
        const message = response.verifyVerificationLink;
        messageBar.success(message);
        setPageMessage(`${message}. You will be redirected shortly`);

        setTimeout(() => {
          const redirectPath =
            import.meta.env.VITE_EMAIL_VERIFICATION_REDIRECT_PATH;
          navigate({
            to: `/${redirectPath}` as "/me",
          });
        }, 5000);
      } catch (error) {
        messageBar.error(
          error instanceof Error ? error.message : "Unable to verify your email",
        );
        setPageMessage("Unable to verify your email");
      }
    })();
  }, []);

  return (
    <MuiGrid container>
      <MuiGrid item xs={12}>
        {pageMessage}
      </MuiGrid>
    </MuiGrid>
  );
}
