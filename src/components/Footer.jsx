import { Box } from '@mui/material';
import "./Footer.css";

const Footer = () => { // Footer component that displays the footer section of the application
    return(
        <Box className="footer"> {/* Main container for the footer */}
            <Box>
                <img src="logo_dark.svg" alt="QKart-icon" />
            </Box>
            <p className='footer-text'>
                QKart is your one stop solution to the buy the latest trending items
        with India's Fastest Delivery to your doorstep
            </p>
        </Box> // Footer component
    );   
}
export default Footer;

