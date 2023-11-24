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


export const FestiveBackgroundAnimation = (props: React.PropsWithChildren & BoxProps) => {
  return (
    // Wrap the entire animation inside of another box that will act as the background
    <Box
      sx={{
        zIndex: 1,
        position: 'absolute',
        width: '100vw', // Fixed viewport width
        height: '100vh', // Fixed viewport height
        overflow: 'hidden', // Prevent scrolling caused by overflowing content
        ...props.sx
      }}
    >

      {/*Full image without the moon*/}
      <Box
        sx={{
          zIndex: 1,
          position: 'absolute',
          width: '100vw', // Fixed viewport width
          height: '100vh', // Fixed viewport height
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

        {/* Static Stars and Snow */}
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
            //animation: `${moveStarsLeftRightAnimation} 3s ease-in-out infinite alternate` // Move stars and snow left and right forever
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
    </Box>
  );
}