
import { Box, Button, Grid, List, ListItem, ListItemText, Paper, TextField } from '@mui/material';
import { Auth, User } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { SignInRequired, useRequiredSignIn } from '../components/UseSignIn';
import { SignOutButton } from '../components/SignOutButton';
import { FestiveBackground } from '../components/FestiveBackground';
import { NavigateFunction, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Account, fetchAccount } from '../model/Account';
import { SecretSanta, fetchSecretSanta } from '../model/SecretSanta';


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

	const [adminSecretSantas, setAdminSecretSantas] = useState<SecretSanta[] | undefined>();
	const [secretSantas, setSecretSantas] = useState<SecretSanta[] | undefined>();

	const fetchSecretSantas = async (account: Account) => {
		const secretSantaPromises: Promise<SecretSanta | null>[] = [];
		for (const ssUid of account.secretSantaUids)
			secretSantaPromises.push(fetchSecretSanta(props.firestore, ssUid));
		const sSantas = (await Promise.all(secretSantaPromises)).filter(v => v !== null);
		setSecretSantas(sSantas as SecretSanta[]);
	};

	const fetchAdminSecretSantas = async (account: Account) => {
		const secretSantaPromises: Promise<SecretSanta | null>[] = [];
		for (const ssUid of account.adminOfSecretSantas)
			secretSantaPromises.push(fetchSecretSanta(props.firestore, ssUid));
		const sSantas = (await Promise.all(secretSantaPromises)).filter(v => v !== null);
		setAdminSecretSantas(sSantas as SecretSanta[]);
	}

	useEffect(() => {
		(async () => {
			const account = await fetchAccount(props.firestore, props.user);
			fetchSecretSantas(account);
			fetchAdminSecretSantas(account);
		})();
	}, []);


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
				<Grid item xs={12}>
					<Box sx={{ fontSize: 20 }}>
						Your Secret Santas:
					</Box>
				</Grid>
				<Grid item xs={12}>
					<List>
						{secretSantas?.map(secretSanta =>
						(<ListItem>
							<ListItemText>{secretSanta.name}</ListItemText>
						</ListItem>))}
					</List>
				</Grid>
				<Grid item xs={12}>
					<Box sx={{ fontSize: 20 }}>
						Secret Santas You Created:
					</Box>
				</Grid>
				<Grid item xs={12}>
					<List>
						{adminSecretSantas?.map(secretSanta =>
						(<ListItem>
							<ListItemText>{secretSanta.name}</ListItemText>
						</ListItem>))}
					</List>
				</Grid>
				<Grid item xs={6}>
					<SignOutButton auth={props.auth} />
				</Grid>
			</Grid>
		</Paper>
	</>);
};