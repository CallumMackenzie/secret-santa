
import { Box, Button, Grid, Paper, TextField } from '@mui/material';
import { Auth, User } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { SignInRequired, useRequiredSignIn } from '../components/UseSignIn';
import { SignOutButton } from '../components/SignOutButton';
import { FestiveBackground } from '../components/FestiveBackground';
import { NavigateFunction, useNavigate } from 'react-router';
import { fetchAccount, fetchSecretSanta } from '../model/Model';
import { useState } from 'react';


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
		<Paper>
			<Grid
				padding={2}
				container
				spacing={1}
				direction='column'
				textAlign='center'
				alignItems='center'
				justifyContent='center'>
				<Grid item xs={12}>
					<Box sx={{ fontSize: 50 }}>
						Secret Santa !
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Box sx={{ fontSize: 20, color: 'secondary.main', fontStyle: 'bold' }}>
						Welcome, {props.user.displayName}!
					</Box>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<Button
						variant="contained"
						onClick={() => navigate("/create")}>
						Create New Secret Santa
					</Button>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<Button
						variant="contained"
						onClick={() => navigate("/join")}>
						Join a Secret Santa
					</Button>
				</Grid>
				<Grid item xs={6}>
					<SignOutButton auth={props.auth} />
				</Grid>
			</Grid>
		</Paper>
	</>);
};