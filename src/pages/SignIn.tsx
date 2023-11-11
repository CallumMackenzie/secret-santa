
import React, { useEffect } from 'react';
import { Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'firebase/auth';
import { signInGoogle, useSignIn } from '../components/UseSignIn';
import { FestiveBackground } from '../components/FestiveBackground';

export const SignIn = (props: {
	auth: Auth
}) => {
	const foundUser = useSignIn(props.auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (foundUser) navigate("home");
	}, [foundUser]);

	return (<>
		<FestiveBackground>
			<Paper
				sx={{ p: 5 }}
				elevation={5}>
				<Grid
					container
					direction="column"
					textAlign="center">
					<Grid item xs={12}>
						<h1>Secret Santa!</h1>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant='contained'
							disabled={foundUser ?? true}
							onClick={() => signInGoogle(props.auth)}>
							Sign in With Google
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</FestiveBackground>
	</>);
}
