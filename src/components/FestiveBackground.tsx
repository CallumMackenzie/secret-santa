import { Box } from "@mui/material";


export const FestiveBackground = (props: React.PropsWithChildren) => {
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
			minHeight="100vh">
			{props.children}
		</Box>
	</>);
}