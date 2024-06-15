import React, { useEffect } from "react";
import { getUser } from "../../hooks/getUser";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { isAuthenticated, fetchUser, error } = getUser();
  useEffect(() => {
    if (!currentUser) {
      fetchUser();
    }
  }, [currentUser]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      <Card
        sx={{
          width: { sm: 300, md: 400, lg: 500 },
          bgcolor: "#808080",
          color: "#fff",
        }}
      >
        <CardContent sx={{ gap: 2 }}>
          {!isAuthenticated && (
            <Typography variant="h6" sx={{ color: "red", mb: 2 }}>
              {error || "Error Getting User Details"}
            </Typography>
          )}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography fontSize={18}>Username:</Typography>
            <Typography>{currentUser?.username}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography fontSize={18}>Email:</Typography>
            <Typography>{currentUser?.email}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LandingPage;
