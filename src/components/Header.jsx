import { Avatar, Box, Button, Stack } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import { useState, useEffect } from "react";

const Header = ({ children, hasHiddenAuthButtons = false }) => { // Header component that displays the application header with navigation and authentication buttons

const [username, setUsername] = useState(""); // State to manage the username
const [token, setToken] = useState(""); // State to manage the authentication token



   const navigate = useNavigate(); // useNavigate hook from react-router-dom to navigate to different routes
  const location = useLocation(); // useLocation hook to get the current location (route) of the application
   useEffect(() => {
    const u = localStorage.getItem("username"); // Fetch username from localStorage
    const t = localStorage.getItem("token"); // Fetch token from localStorage
    

    setUsername(u && u !== "undefined" ? u : ""); // Set username state, defaulting to empty string if not found or undefined
    setToken(t && t !== "undefined" ? t : ""); // Set token state, defaulting to empty string if not found or undefined
    


    console.log("🔁 Header useEffect: Fetched from localStorage", { 
    username: u,
    token: t,
    
  });

  }, [location]); // Re-run on route change (like after login)

  const handleLogout = () => { // Function to handle user logout
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("username");   // Remove username from localStorage

    setUsername(""); // Clear username state
    setToken(""); // Clear token state
     
    navigate("/login"); // Navigate to the login page after logout
  };


  return (
    <Box // Main container for the header
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
      <Box className="header-title"> {/* Title section of the header */}
        <Link to="/">
          <img src="logo_light.svg" alt="Logo" height="40" />
        </Link>
      </Box>
      {children && (
        <Box width={"30vw"}> {/* Container for any children components passed to the Header component */}
          {children} {/* Render children components, such as search bar or other elements */}
        </Box>
      ) }

      {!hasHiddenAuthButtons && username && token ? (  // If the user is authenticated, display the username and logout button
        <Stack direction="row" spacing={1} alignItems="center"> { /* Stack to arrange items horizontally with spacing */}
          <Avatar alt={username} src="./avatar.jpg" /> {/* Avatar to display user's profile picture */}
          <p style={{ margin: 0 }}>{ username}</p> {/* Display the username */}
          <button onClick={handleLogout}>Logout</button> {/* Logout button that calls handleLogout function on click */}
        </Stack>
      ) : !hasHiddenAuthButtons ? ( // If the user is not authenticated and hasHiddenAuthButtons is false, display login and register buttons
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

export default Header; // Exporting the Header component as the default export of this module
