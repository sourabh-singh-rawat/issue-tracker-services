import { continueWithGoogle } from "../../utils/firebase";
import { SignUpContainer } from "./signup.styles";
import Button from "../../components/button/button.component";

const SignUp = () => {
    const continueWithGoogleHandler = async () => {
        const userCredential = await continueWithGoogle();

        // Store userCredential into context or redux store
        // TODO
    };

    return (
        <SignUpContainer>
            <h1>Sign Up Page</h1>
            <p>
                Create an account & help your organization track issues
                efficiently.
            </p>
            <Button onClick={continueWithGoogleHandler}>
                Continue with Google
            </Button>
        </SignUpContainer>
    );
};

export default SignUp;
