import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { continueWithGoogle } from "../../utils/firebase";

const SignUp = () => {
    const navigate = useNavigate();

    const handler = async () => {
        const userCredential = await continueWithGoogle();

        // redirect user to the dashboard if authenticated
        if (userCredential) {
            navigate("/");
        }
    };

    return (
        <Fragment>
            <h1>Sign Up Page</h1>
            <p>
                Create an account & help your organization track issues
                efficiently.
            </p>
            <button onClick={handler}>Continue with Google</button>
        </Fragment>
    );
};

export default SignUp;
