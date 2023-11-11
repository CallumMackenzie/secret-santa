import { Box, Button, CircularProgress, Grid, Paper, TextField } from "@mui/material";
import { FestiveBackground } from "../components/FestiveBackground";
import { useEffect, useState } from "react";
import { SignInRequired, useRequiredSignIn } from "../components/UseSignIn";
import { Auth, User } from "firebase/auth";
import { Account, SecretSanta, fetchAccount, getNextSecretSantaUid, saveSecretSanta } from "../model/Model";
import { Firestore } from "firebase/firestore";
import { useNavigate } from "react-router";



export const SecretSantaCreator = (props: {
	auth: Auth,
	firestore: Firestore
}) => {
	const user = useRequiredSignIn(props.auth);

	return (<>
		<FestiveBackground>
			<SignInRequired user={user} auth={props.auth}>
				<SecretSantaCreatorUserVerified user={user!!} {...props} />
			</SignInRequired>
		</FestiveBackground>
	</>);
}

enum CreationState {
	NotCreated = 0,
	Creating = 1,
	Created = 2
}

const SecretSantaCreatorUserVerified = (props: {
	firestore: Firestore,
	user: User
}) => {
	const [name, setName] = useState<string | undefined>(undefined);
	const [admin, setAdmin] = useState<Account | undefined>(undefined);
	const [creationState, setCreationState] = useState(CreationState.NotCreated);
	const [guidelines, setGuidelines] = useState<string | undefined>(undefined);

	useEffect(() => {
		fetchAccount(props.firestore, props.user)
			.then(account => setAdmin(account));
	}, [props.firestore, props.user]);

	const create = async () => {
		setCreationState(CreationState.Creating);
		const uid = await getNextSecretSantaUid(props.firestore);
		const secretSanta: SecretSanta = {
			uid,
			name: name!!,
			adminUserUid: admin!!.userUid,
			participants: [],
			guidelines: guidelines!!,
			started: false
		};
		await saveSecretSanta(props.firestore, secretSanta);
		setCreationState(CreationState.Created);
	};

	return (<>
		<Paper
			sx={{ minHeight: "100vh" }}>
			<Grid
				container
				direction='column'
				alignItems='stretch'
				justifyContent='center'
				spacing={2}
				sx={{ p: 2 }}>
				<Grid item
					textAlign='center'>
					<Box sx={{
						fontSize: 50
					}}>
						Secret Santa Creator
					</Box>
				</Grid>
				<Grid item>
					<TextField
						disabled={creationState !== CreationState.NotCreated}
						fullWidth={true}
						onChange={(event) => setName(event.target.value)}
						required={true}
						error={name === ""}
						helperText={name === "" ? "Please enter a name." : "A festive name!"}
						label='Secret Santa Name'
						variant='outlined' />
				</Grid>
				<Grid item>
					<TextField
						disabled={creationState !== CreationState.NotCreated}
						multiline={true}
						fullWidth={true}
						minRows={4}
						maxRows={10}
						onChange={event => setGuidelines(event.target.value)}
						required={true}
						error={guidelines === ""}
						helperText={guidelines === ""
							? "Please enter guidelines."
							: "Guidelines, rules, and regulations for your participants!"}
						label="Guidelines"
						variant="outlined" />
				</Grid>
				<Grid item>
					<Box
						display='flex'
						alignItems='center'
						justifyContent='center'>
						<Button
							color={!admin ? 'secondary' : (
								creationState === CreationState.Created ? 'success' : undefined
							)}
							disabled={creationState !== CreationState.NotCreated
								|| !admin
								|| guidelines === "" || !guidelines
								|| name === "" || !name}
							onClick={() => create()}
							variant='contained'>
							{["Create Secret Santa!", "Creating", "Created"][creationState]}
						</Button>
					</Box>
				</Grid>
				{creationState === CreationState.Creating &&
					<Grid item>
						<Box
							display='flex'
							alignItems='center'
							justifyContent='center'>
							<CircularProgress />
						</Box>
					</Grid>}
				{creationState !== CreationState.Creating
					&& <CreatedOptions creationState={creationState} />}
			</Grid>
		</Paper>
	</>);
}

const CreatedOptions = (props: {
	creationState: CreationState
}) => {
	const navigate = useNavigate();

	return (<>
		<Grid item>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='center'>
				<Button
					disabled={props.creationState === CreationState.Creating}
					color={props.creationState === CreationState.Created ? 'success' : undefined}
					onClick={() => navigate("/home")}
					variant="contained">
					Go Home
				</Button>
			</Box>
		</Grid>
	</>);
};