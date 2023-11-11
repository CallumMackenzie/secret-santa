import { Box, Button, Grid, Paper } from "@mui/material";
import { FestiveBackground } from "../components/FestiveBackground";
import { SignOutButton } from "../components/SignOutButton";
import { Auth } from "firebase/auth";
import { useNavigate } from "react-router";

export const PageNotFound = (props: { auth: Auth }) => {
	const navigate = useNavigate();

	return (<>
		<FestiveBackground>
			<Paper sx={{ p: 2 }}>
				<Grid
					container
					alignItems='center'
					justifyContent="center"
					direction='column'>
					<Grid item>
						<Box
							textAlign='center'
							sx={{
								color: 'error.main',
								fontSize: 14,
								fontWeight: 'bold'
							}} >
							404!
						</Box>
					</Grid>
					<Grid item>
						<Box
							textAlign='center'
							sx={{
								fontSize: '4em',
								fontWeight: 'medium'
							}}>
							Page Not Found!
						</Box>
					</Grid >
					<Grid item>
						<Button
							variant='contained'
							onClick={() => navigate("/")}>
							Return
						</Button>
					</Grid >
				</Grid>
			</Paper>
		</FestiveBackground>
	</>);
};