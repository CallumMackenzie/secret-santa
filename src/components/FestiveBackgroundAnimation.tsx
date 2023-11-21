import { Box, BoxProps } from "@mui/material";
import { keyframes } from '@emotion/react';

const moveUpAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px); // Adjust this value for desired movement
  }
`;


export const FestiveBackgroundAnimation = (props: React.PropsWithChildren & BoxProps) => {
    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: 'url("/WinterVectorNoMoon.svg")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                ...props.sx
            }}
            {...props}
        >
            {/* Moving Image */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url("/WinterVectorOnlyTheMoon.svg")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    animation: `${moveUpAnimation} 1s ease-in-out infinite alternate` // Apply the animation
                }}
            />

            {props.children}
        </Box>
    );
}