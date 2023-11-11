import { Button } from "@mui/material";
import { Auth } from "firebase/auth";
import { useNavigate } from "react-router";

export const SignOutButton = (props: {
	auth: Auth
}) => {
	const navigate = useNavigate();

	return (<>
		<Button
			variant="contained"
			onClick={() => {
				props.auth.signOut();
				navigate("/");
			}}>
			Sign Out
		</Button>
	</>);
}