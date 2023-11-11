import { useMemo, useState } from "react";
import { fetchAccount, fetchSecretSanta } from "../model/Model";
import { Firestore } from "firebase/firestore";
import { Auth, User } from "firebase/auth";
import { SignInRequired, useRequiredSignIn } from "../components/UseSignIn";
import { FestiveBackground } from "../components/FestiveBackground";
import { Box, Button, Grid, IconButton, List, ListItem, Paper, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import { Delete } from "@mui/icons-material";

const wishlistTextLabels = ["This year I would love...",
	"I wish for...",
	"This is definitely on my list...",
	"I want...",
	"I hope for...",
	"Something I really want is...",
	"It would be great if I could get...",
	"I hope santa gets me...",
	"One thing I want this year is...",
	"I've been waiting to get this...",
	"I really want...",
	"An awesome gift would be...",
	"A gift I want is..."];

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

interface WishlistItem {
	key: number,
	val: string
}

const JoinSecretSantaUserSignedIn = (props: JoinSecretSantaProps & {
	user: User
}) => {
	const navigate = useNavigate();
	const [joinState, setJoinState] = useState(JoinState.NotJoined);
	const [joinUid, setJoinUid] = useState("");
	const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
	const [nextWishlistKey, setNextWishlistKey] = useState(0);

	const wishlistLabels = useMemo(() => {
		let labelsOrigin: string[] = Object.assign([], wishlistTextLabels);
		let labelsDst: string[] = [];
		for (let i = 0; i < wishlistTextLabels.length; ++i) {
			const randomIndex = Math.floor(Math.random() * labelsOrigin.length);
			labelsDst.push(labelsOrigin[randomIndex]);
			labelsOrigin.splice(randomIndex, 1);
		}
		return labelsDst;
	}, []);

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
				<Grid item xs={12} textAlign='center'>
					<Box sx={{ fontSize: 50 }}>
						Join a Secret Santa
					</Box>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						disabled={joinState === JoinState.Joining}
						onChange={event => setJoinUid(event.target.value)}
						error={joinState === JoinState.JoinError}
						helperText={joinState === JoinState.JoinError ? "Secret santa not found" : undefined}
						label="Join Code" />
				</Grid>
				<Grid item xs={12} sm={6}>
					<Button
						disabled={joinState === JoinState.Joining
							|| joinUid === ""}
						onClick={() => joinSecretSanta(joinUid)}>
						Join Secret Santa
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Button
						variant="contained"
						disabled={joinState === JoinState.Joining}
						onClick={() => navigate("/home")}>
						Home
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Box sx={{ fontSize: 25 }}>
						Wishlist
					</Box>
					<Button
						onClick={() => {
							setWishlist([...wishlist, { key: nextWishlistKey, val: "" }]);
							setNextWishlistKey(nextWishlistKey + 1);
						}}>
						Add
					</Button>
				</Grid>
				<Grid item xs={12}>
					<List>
						{wishlist.map((wishlistItem) => (
							<ListItem
								key={wishlistItem.key}
								secondaryAction={
									<IconButton onClick={() => {
										let newWishList: WishlistItem[] = [];
										for (let j = 0; j < wishlist.length; ++j)
											if (wishlist[j].key !== wishlistItem.key)
												newWishList.push(wishlist[j]);
										setWishlist(newWishList);
									}}>
										<Delete />
									</IconButton>
								}
								disableGutters>
								<TextField
									fullWidth={true}
									content={wishlistItem.val}
									onChange={event => {
										const newWishList: WishlistItem[] = Object.assign(wishlist);
										for (let j = 0; j < wishlist.length; ++j)
											if (wishlist[j].key == wishlistItem.key)
												newWishList[j].val = event.target.value;
										setWishlist(newWishList);
									}}
									label={wishlistLabels[wishlistItem.key % wishlistLabels.length]} />
							</ListItem>
						))}
					</List>
				</Grid>
			</Grid>
		</Paper>
	</>);
};