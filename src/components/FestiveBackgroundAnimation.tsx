import { Box, BoxProps } from "@mui/material";
import { keyframes } from '@emotion/react';

const moveMoonUpAnimation = keyframes`
  0% {
    transform: translateY(50%); // Start from the bottom
  }
  100% {
    transform: translateY(-10%); // Move to the top
  }
`;

const moveStarsLeftRightAnimation = keyframes`
  0% {
    transform: translateX(-5px); // Start 3 pixels to the left
  }
  100% {
    transform: translateX(0); // Move back to original position
  }
`;

//Goes to from start to finish 0% -> 16.67% in 1 second and then will take 5 seconds to get to 100% so that we can delay the animation.
const shootingStarAnimation = keyframes`
0% {
    transform: translateX(-100px) translateY(-100px);
    opacity: 100%;
  }
16.67% {
    transform: translateX(766px) translateY(400px);
  }
100% {
    transform: translateX(766px) translateY(405px);
  }
`;


export const FestiveBackgroundAnimation = (props: React.PropsWithChildren & BoxProps) => {
    return (
        /*Full image without the moon*/
        <Box
            sx={{
                zIndex: 1,
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: 'url("/WinterVectorNoStarsSnowOrMoon.svg")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                ...props.sx
            }}
            {...props}
        >
            {/* Moving Stars and Snow */}
            <Box
                sx={{
                    zIndex: 2,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url("/WinterVectorStarsAndSnowOnly.svg")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    animation: `${moveStarsLeftRightAnimation} 3s ease-in-out infinite alternate` // Move stars and snow left and right forever
                }}
            />
                {/* Moving Shooting Star */}
                <Box
                sx={{
                    zIndex: 2,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url("/WinterVectorOnlyShootingStar.svg")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    animation: `${shootingStarAnimation} 6s linear infinite`, // Move stars and snow left and right forever
                    animationDelay: '3s'
                }}
            />
            {/* Moving Moon */}
            <Box
                sx={{
                    zIndex: 3,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url("/WinterVectorOnlyTheMoon.svg")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    animation: `${moveMoonUpAnimation} 5s forwards` // Move the moon up
                }}
            />
            {/* Mountains only image to cover the moon*/}
            <Box
                sx={{
                    zIndex: 4,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url("/WinterVectorTransparentBackgroundWithSnow.svg")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center'
                }}
            />
            {/* Mountains only image to cover the sign in button*/}
            <Box
                sx={{
                    zIndex: 7,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url("/WinterVectorTransparentBackgroundWithSnow.svg")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    pointerEvents: 'none' // To allow the sign in button to still be press despite being overlayed on top
                }}
            />
            {props.children}
        </Box>
        
    );
}