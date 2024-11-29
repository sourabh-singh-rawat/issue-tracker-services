import React, { useEffect, useState } from "react";
import MuiGrid from "@mui/material/Grid";
import { useVerifyVerificationLinkMutation } from "../../../../api/codegen/gql/graphql";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMessageBar } from "../../../message-bar/hooks";

export function EmailVerification() {
  const [pageMessage, setPageMessage] = useState(
    "Please wait while we verify your email",
  );
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const messageBar = useMessageBar();
  const [verifyVerificationLink] = useVerifyVerificationLinkMutation({
    onError(error) {
      messageBar.showError(error.message);
      setPageMessage("Unable to verify your email");
    },
    onCompleted(response) {
      const message = response.verifyVerificationLink;
      messageBar.showSuccess(message);
      setPageMessage(`${message}. You will be redirected shortly`);

      setTimeout(() => {
        navigate("/signin");
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
