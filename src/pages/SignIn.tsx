
import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'firebase/auth';
import { signInGoogle, useSignIn } from '../components/UseSignIn';

export const SignIn = (props: {
	auth: Auth
}) => {
	const foundUser = useSignIn(props.auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (foundUser) navigate("home");
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
		</Box>
	</>);
}
