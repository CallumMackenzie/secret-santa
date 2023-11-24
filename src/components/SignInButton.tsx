import { Button, ButtonProps } from "@mui/material";
import { Auth } from "firebase/auth";
import { signInGoogle, useSignIn } from "./UseSignIn";

interface SignInButtonProps extends ButtonProps {
	auth: Auth
}

export const SignInButton = (props: SignInButtonProps) => {

    const foundUser = useSignIn(props.auth);

    const beveledStyle = {
        backgroundColor: "#224674",
        borderRadius: '25px',
        fontFamily: 'Arial, sans-serif', 
    };

    return (<>
        <Button
            variant='contained'
		    disabled={foundUser ?? true}
    		onClick={() => signInGoogle(props.auth)}
            style={beveledStyle}>
	    	Sign in With Google
        </Button>
        </>);

};
