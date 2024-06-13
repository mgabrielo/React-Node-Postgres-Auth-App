import { CircularProgress } from "@mui/material";
import Box from "@mui/material/node/Box";

const Spinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <CircularProgress disableShrink size={"5rem"} />
    </Box>
  );
};

export default Spinner;
