import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Grid
      container
      flexDirection={"row"}
      alignItems={"center"}
      sx={{ width: "100%", height: "100vh" }}
    >
      <Grid
        item
        xs={12}
        sx={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3">Welcome to PostgresAuth</Typography>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            mt: 7,
            px: { xs: 7, sm: 15, md: 20, lg: 25, xl: 25 },
          }}
        >
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={() =>
              currentUser !== null
                ? navigate("/landing-page")
                : navigate("/login")
            }
            sx={{
              textTransform: "capitalize",
              width: "100%",
            }}
          >
            {currentUser ? "View Profile" : "Click Here to Log In"}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HomePage;
