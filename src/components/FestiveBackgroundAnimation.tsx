import { Box, BoxProps } from "@mui/material";
import { keyframes } from '@emotion/react';

const moveUpAnimation = keyframes`
  0% {
    transform: translateY(50%); // Start from the bottom
  }
  100% {
    transform: translateY(-10%); // Move to the top
  }
`;


export const FestiveBackgroundAnimation = (props: React.PropsWithChildren & BoxProps) => {
    return (
        /*Full image without the moon*/
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
            {/* Moving Moon */}
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
                    animation: `${moveUpAnimation} 5s forwards` // Move the moon up
                }}
            />
            {/* Mountains only image */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url("/WinterVectorTransparentBackground.svg")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center'
                }}
            />
            {props.children}
        </Box>
        
    );
}