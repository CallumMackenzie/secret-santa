
import { Box, Button, Grid, Paper } from '@mui/material';
import { Auth, User } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { SignInRequired, useRequiredSignIn, useSignIn } from './UseSignIn';
import { SignOutButton } from './SignOutButton';


export const Home = (props: {
	firestore: Firestore,
	auth: Auth
}) => {
	const [navigate, user, foundUser] = useRequiredSignIn(props.auth);
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
			<SignInRequired auth={props.auth} user={user}>
				<HomeSignedIn {...props} user={user!!} />
			</SignInRequired>
		</Box>
	</>);
};

const HomeSignedIn = (props: {
	auth: Auth,
	firestore: Firestore,
	user: User
}) => {
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
					<Button variant="contained">
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