import { Button } from "@mui/material";
import { Auth } from "firebase/auth";

export const SignOutButton = (props: {
	auth: Auth
}) => {
	return (<>
		<Button
			variant="contained"
			onClick={() => props.auth.signOut()}>
			Sign Out
		</Button>
	</>);
}