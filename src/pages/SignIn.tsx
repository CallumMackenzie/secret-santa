
import React, { useEffect } from 'react';
import { Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'firebase/auth';
import { signInGoogle, useSignIn } from '../components/UseSignIn';
import { FestiveBackground } from '../components/FestiveBackground';
import { SignInButton } from '../components/SignInButton';

export const SignIn = (props: {
	auth: Auth
}) => {
	const foundUser = useSignIn(props.auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (foundUser) navigate("home");
	}, [foundUser]);

	const h1Style = {
		fontFamily: 'Arial, sans-serif', 
	};

	return (<>
		<FestiveBackground>
				<Grid
					container
					direction="column"
					textAlign="center">
					<Grid item xs={12}>
						<h1 style={h1Style}>Secret Santa!</h1>
					</Grid>
					<Grid item xs={12}>
					<SignInButton auth={props.auth}/>
					</Grid>
				</Grid>
		</FestiveBackground>
	</>);
}
