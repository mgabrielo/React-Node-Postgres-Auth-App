import React, { useEffect } from "react";
import { getUser } from "../../hooks/getUser";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Spinner from "../../components/spinner/Spinner";
import { clearAuthError } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

const LandingPage = () => {
  const { currentUser, error, loading, fetchUser, isAuthenticated } = getUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) {
      dispatch(clearAuthError());
      fetchUser();
    }
  }, [currentUser]);

  if (loading) {
    return <Spinner />;
  }

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
          {error && !isAuthenticated && (
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
