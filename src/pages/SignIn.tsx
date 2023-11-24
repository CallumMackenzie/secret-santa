
import { useEffect } from 'react';
import { Box, Grid, Typography, keyframes } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'firebase/auth';
import { useSignIn } from '../components/UseSignIn';
import { FestiveBackgroundAnimation } from '../components/FestiveBackgroundAnimation';
import { SignInButton } from '../components/SignInButton';

// To move button and text to top
const moveToTop = keyframes`
  0% {
    transform: translateY(900%); // Start from the bottom
  }
  100% {
    transform: translateY(0%); // Move to the top
  }
`;

export const SignIn = (props: {
	auth: Auth
}) => {
	const foundUser = useSignIn(props.auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (foundUser) navigate("home");
	}, [foundUser]);

	useEffect(() => {
    	// Disable scrolling
    	document.body.style.overflow = 'hidden';

    	// Prevent touchmove events for iOS devices
    	const preventTouchMove = (e: { preventDefault: () => any; }) => e.preventDefault();
    	document.addEventListener('touchmove', preventTouchMove, { passive: false });

    	// Re-enable scrolling when the component is unmounted
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

	const h1Style = {
		fontFamily: 'Arial, sans-serif',
		color: '#214168',
		fontWeight: 'bold',
		fontSize: '3rem'
		};

	return (<>
		<FestiveBackgroundAnimation>
				<Grid
					container
					direction="column"
					textAlign="center">
					<Grid item xs={1} sm={1} md={1} lg={1}>
						<Box sx = {{
							zIndex: 5,
							position: 'relative',
							padding: '2rem',
							animation: `${moveToTop} 5s forwards`}}>
								<Typography variant="h1" sx={h1Style}>
								Secret Santa
								</Typography >
						</Box>
					</Grid>
					<Grid item xs={1} sm={1} md={1} lg={1}>
					<Box sx = {{
							zIndex: 5,
							position: 'relative',
							animation: `${moveToTop} 5s forwards`}}>
					<SignInButton auth={props.auth}/>
					</Box>
					</Grid>
				</Grid>
		</FestiveBackgroundAnimation>
	</>);
}
