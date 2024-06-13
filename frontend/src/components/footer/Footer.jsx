import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box
      sx={{
        height: "fit-content",
        display: "flex",
        flex: 1,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#1976d2",
        fontSize: 15,
        color: "#fff",
        flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
        overflowX: "hidden",
        gap: { xs: 2, sm: 2, md: 5, lg: 10 },
      }}
    >
      <Typography>CopyRight @ PostgresAuth</Typography>
      <Typography>Feel The Experience...!!!</Typography>
      <Typography>Built by For All Purposes</Typography>
    </Box>
  );
};

export default Footer;
