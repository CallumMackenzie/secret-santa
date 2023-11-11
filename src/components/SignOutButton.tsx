import { Button, ButtonProps } from "@mui/material";
import { Auth } from "firebase/auth";
import { useNavigate } from "react-router";

interface SignOutButtonProps extends ButtonProps {
	auth: Auth
}

export const SignOutButton = (props: SignOutButtonProps) => {
	const navigate = useNavigate();

	return (<>
		<Button
			{...props}
			variant="contained"
			onClick={() => {
				props.auth.signOut();
				navigate("/");
			}}>
			Sign Out
		</Button>
	</>);
}