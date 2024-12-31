import MuiGrid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyVerificationLinkMutation } from "../../../../api/codegen/gql/graphql";
import { useSnackbar } from "../../../../common/components/Snackbar/hooks";

export function EmailVerification() {
  const [pageMessage, setPageMessage] = useState(
    "Please wait while we verify your email",
  );
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const messageBar = useSnackbar();
  const [verifyVerificationLink] = useVerifyVerificationLinkMutation({
    onError(error) {
      messageBar.error(error.message);
      setPageMessage("Unable to verify your email");
    },
    onCompleted(response) {
      const message = response.verifyVerificationLink;
      messageBar.success(message);
      setPageMessage(`${message}. You will be redirected shortly`);

      setTimeout(() => {
        navigate(`/${import.meta.env.VITE_EMAIL_VERIFICATION_REDIRECT_PATH}`);
      }, 5000);
    },
  });

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) verifyVerificationLink({ variables: { input: { token } } });
  }, []);

  return (
    <MuiGrid container>
      <MuiGrid item xs={12}>
        {pageMessage}
      </MuiGrid>
    </MuiGrid>
  );
}
