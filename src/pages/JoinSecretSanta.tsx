import { useState } from "react";
import { fetchAccount, fetchSecretSanta } from "../model/Model";
import { Firestore } from "firebase/firestore";
import { Auth, User } from "firebase/auth";
import { SignInRequired, useRequiredSignIn } from "../components/UseSignIn";
import { FestiveBackground } from "../components/FestiveBackground";
import { Button, Grid, Paper, TextField } from "@mui/material";
import { useNavigate } from "react-router";



enum JoinState {
	NotJoined = 0,
	Joining = 1,
	Joined = 2,
	JoinError = 3,
}

interface JoinSecretSantaProps {
	firestore: Firestore,
	auth: Auth,
}

export const JoinSecretSanta = (props: JoinSecretSantaProps) => {
	const user = useRequiredSignIn(props.auth);

	return (<>
		<FestiveBackground>
			<SignInRequired user={user} auth={props.auth}>
				<JoinSecretSantaUserSignedIn {...props} user={user!!} />
			</SignInRequired>
		</FestiveBackground>
	</>);
};

const JoinSecretSantaUserSignedIn = (props: JoinSecretSantaProps & {
	user: User
}) => {
	const navigate = useNavigate();
	const [joinState, setJoinState] = useState(JoinState.NotJoined);
	const [joinUid, setJoinUid] = useState("");

	const joinSecretSanta = async (uid: string) => {
		setJoinState(JoinState.Joining);
		const secretSanta = await fetchSecretSanta(props.firestore, uid);
		if (!secretSanta)
			return setJoinState(JoinState.JoinError);

		const account = await fetchAccount(props.firestore, props.user);

		setJoinState(JoinState.Joined);
	};

	return (<>
		<Paper>
			<Grid
				padding={2}
				container
				spacing={1}
				textAlign="center"
				justifyContent='center'
				alignItems="center">
				<Grid item xs={6}>
					<TextField
						disabled={joinState === JoinState.Joining}
						onChange={event => setJoinUid(event.target.value)}
						error={joinState === JoinState.JoinError}
						helperText={joinState === JoinState.JoinError ? "Secret santa not found" : undefined}
						label="Join Code" />
				</Grid>
				<Grid item xs={6}>
					<Button
						disabled={joinState === JoinState.Joining
							|| joinUid === ""}
						onClick={() => joinSecretSanta(joinUid)}>
						Join Secret Santa
					</Button>
				</Grid>
				<Grid item xs={6}>
					<Button
						variant="contained"
						disabled={joinState === JoinState.Joining}
						onClick={() => navigate("/home")}>
						Home
					</Button>
				</Grid>
			</Grid>
		</Paper>
	</>);
};