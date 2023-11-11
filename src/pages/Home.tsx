
import { Box, Button, Grid, Paper } from '@mui/material';
import { Auth, User } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { SignInRequired, useRequiredSignIn } from '../components/UseSignIn';
import { SignOutButton } from '../components/SignOutButton';
import { FestiveBackground } from '../components/FestiveBackground';
import { NavigateFunction, useNavigate } from 'react-router';


export const Home = (props: {
	firestore: Firestore,
	auth: Auth
}) => {
	const user = useRequiredSignIn(props.auth);
	return (<>
		<FestiveBackground>
			<SignInRequired auth={props.auth} user={user}>
				<HomeSignedIn {...props} user={user!!} />
			</SignInRequired>
		</FestiveBackground>
	</>);
};

const HomeSignedIn = (props: {
	auth: Auth,
	firestore: Firestore,
	user: User
}) => {
	const navigate = useNavigate();

	return (<>
		<Paper
			sx={{ p: 2 }}
			elevation={3}>
			<Grid
				container
				spacing={1}
				textAlign="center"
				alignItems="center"
				direction="column">
				<Grid item>
					<h1>Welcome, {props.user.displayName}!</h1>
				</Grid>
				<Grid item>
					<Button
						variant="contained"
						onClick={() => navigate("/create")}>
						Create New Secret Santa
					</Button>
				</Grid>
				<Grid item>
					<SignOutButton auth={props.auth} />
				</Grid>
			</Grid>
		</Paper>
	</>);
};