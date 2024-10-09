import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import isLogin from "../../contexts/Islogin";
import { useContext } from "react";
import AuthContext from "../../contexts/Islogin";

const authenticate = (username, password) => {
  // این تابع باید اعتبارسنجی کاربر را انجام دهد
  // برای مثال، میتوانید از یک API برای بررسی اعتبار کاربر استفاده کنید
  // در اینجا، فرض میکنیم که اعتبارسنجی موفق است اگر یوزرنیم و پسورد "admin" باشد
  return username === "admin" && password === "admin";
};




export default function LoginForm() {
  const { isLogin, toggleLogin } = useContext(AuthContext);
  console.log("islogin", isLogin);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (authenticate(username, password)) {
      toggleLogin()
      navigate(`/${username}/home`);
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
          Login{" "}
        </Typography>{" "}
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
          />{" "}
          {error && (
            <Typography color="error" variant="body2">
              {" "}
              {error}{" "}
            </Typography>
          )}{" "}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login{" "}
          </Button>{" "}
        </form>{" "}
      </Box>{" "}
    </Container>
  );
}
