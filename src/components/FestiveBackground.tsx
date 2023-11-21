import { Box, BoxProps } from "@mui/material";


export const FestiveBackground = (props: React.PropsWithChildren & BoxProps) => {
	return (<>
		<Box
			style={{
				backgroundImage: 'url("/WinterVectorCompleteArt.svg")',
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center center",
				backgroundAttachment: "scroll"
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