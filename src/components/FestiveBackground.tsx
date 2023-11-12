import { Box, BoxProps } from "@mui/material";


export const FestiveBackground = (props: React.PropsWithChildren & BoxProps) => {
	return (<>
		<Box
			style={{
				backgroundImage: 'url("/background.jpg")',
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat"
			}}
			display="flex"
			justifyContent="center"
			alignItems="center"
			minHeight="100vh"
			{...props}>
			{props.children}
		</Box>
	</>);
}