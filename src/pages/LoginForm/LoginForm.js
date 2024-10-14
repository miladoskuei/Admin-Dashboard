import React, { useState, useContext, useEffect } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/Islogin";
import { database } from "../../firebaseConfig";
import { ref, get, child } from "firebase/database";

const authenticate = async (username, password) => {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, `admins/${username}`));
    if (snapshot.exists()) {
      const adminData = snapshot.val();
      return adminData.password === password;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching admin data:", error);
    return false;
  }
};

export default function LoginForm() {
  const {  toggleLogin, LogedInUsername, setLoginUser } =
    useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (LogedInUsername) {
      console.log("Logged in username:", LogedInUsername);
      navigate(`/${LogedInUsername}/home`);
    }
  }, [LogedInUsername, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await authenticate(username, password)) {
      toggleLogin();
      setLoginUser(username);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 1 }}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}
