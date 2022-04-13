import { continueWithGoogle } from "../../utils/firebase";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

const SignUp = () => {
  const continueWithGoogleHandler = async () => {
    const userCredential = await continueWithGoogle();

    // Store userCredential into context or redux store
    // TODO
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold">
        Sign Up Page
      </Typography>
      <Typography variant="body1">
        Create an account & help your organization track issues efficiently.
      </Typography>
      <Button variant="contained" onClick={continueWithGoogleHandler}>
        Continue with Google
      </Button>
    </Box>
  );
};

export default SignUp;
