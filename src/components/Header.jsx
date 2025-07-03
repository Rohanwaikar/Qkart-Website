import { Avatar, Box, Button, Stack } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import { useState, useEffect } from "react";

const Header = ({ children, hasHiddenAuthButtons = false }) => {

const [username, setUsername] = useState("");
const [token, setToken] = useState("");
const [balance, setBalance] = useState("");


   const navigate = useNavigate();
  const location = useLocation();
  
   useEffect(() => {
    const u = localStorage.getItem("username");
    const t = localStorage.getItem("token");
    const b = localStorage.getItem("balance");

    setUsername(u && u !== "undefined" ? u : "");
    setToken(t && t !== "undefined" ? t : "");
    setBalance(b && b !== "undefined" ? b : "");


    console.log("🔁 Header useEffect: Fetched from localStorage", {
    username: u,
    token: t,
    balance: b
  });

  }, [location]); // Re-run on route change (like after login)

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("balance");

    setUsername("");
    setToken("");
    setBalance("");
    navigate("/login");
  };


  return (
    <Box
      className="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        backgroundColor: "#1976d2",
        color: "white",
      }}
    >
      <Box className="header-title">
        <Link to="/">
          <img src="logo_light.svg" alt="Logo" height="40" />
        </Link>
      </Box>
      {!hasHiddenAuthButtons && username && token ? (
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar alt={username} src="./avatar.jpg" />
          <p style={{ margin: 0 }}>{ username}</p>
          <button onClick={handleLogout}>Logout</button>
        </Stack>
      ) : !hasHiddenAuthButtons ? (
        <Stack direction="row" spacing={2}>
          <Link to="/login">
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="outlined" color="secondary">
              Register
            </Button>
          </Link>
        </Stack>
      ) : null}
    </Box>
  );
};

export default Header;
