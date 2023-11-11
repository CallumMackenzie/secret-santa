
import { Box, Button, Grid, Paper } from '@mui/material';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSignIn } from './UseSignIn';
import { SignOutButton } from './SignOutButton';


export const Home = (props: {
	firestore: Firestore,
	auth: Auth
}) => {
	const navigate = useNavigate();
	const foundUser = useSignIn(props.auth);
	const [user, setUser] = useState(props.auth.currentUser);

	useEffect(() => {
		if (foundUser === false) navigate("/");
		else if (foundUser === true) setUser(props.auth.currentUser);
	}, [foundUser]);

	return (<>
		<Box
			style={{
				backgroundImage: 'url("/background.jpg")',
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat"
			}}
			display="flex"
			justifyContent="center"
			alignItems="center"
			minHeight="100vh">
			<Paper
				style={{ padding: "3em" }}
				elevation={3}>
				<Grid
					container
					alignItems="center"
					direction="column">
					<Grid item xs={12}>
						<h1>Welcome, {user?.displayName}!</h1>
					</Grid>
					<Grid item>
						<SignOutButton auth={props.auth} />
					</Grid>
				</Grid>
			</Paper>
		</Box>
	</>);
};
