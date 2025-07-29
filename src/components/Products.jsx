import { useRouteLoaderData } from "react-router-dom"; // Importing useRouteLoaderData to access data loaded by the route
import Footer from "./Footer"; // Importing Footer component to display at the bottom of the page
import Header from "./Header"; // Importing Header component to display at the top of the page
import Cart from "./Cart"; // Importing Cart component to display the shopping cart
import { // MUI Components
  Button, // Importing Button component from MUI for clickable buttons
  Card, // Importing Card component from MUI for displaying product information
  CardActions, // Importing CardActions component from MUI for actions related to the card
  CardContent, // Importing CardContent component from MUI for the content of the card
  CardMedia, // Importing CardMedia component from MUI for displaying images in the card
  Rating, // Importing Rating component from MUI for displaying product ratings
  Typography, // Importing Typography component from MUI for text styling
  Box, // Importing Box component from MUI for layout and styling
  TextField, // Importing TextField component from MUI for input fields
  InputAdornment, // Importing InputAdornment component from MUI for adding adornments to input fields
} from "@mui/material"; // Importing Material-UI components for building the UI
import { AddShoppingCartOutlined, Search } from "@mui/icons-material"; // Importing icons from Material-UI for use in buttons and other components
import "./Products.css"; // Importing custom CSS for styling the Products component
import { useState, useEffect } from "react"; // Importing useState and useEffect hooks from React for managing state and side effects

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; // Getting the API URL from environment variables or defaulting to localhost


 export const getTotalCartValue = (cartItems = []) => { // Function to calculate the total value of items in the cart
    return cartItems.reduce((total, item) => { // Reduce function to iterate over each item in the cart
      return total + (item.cost * (item.quantity || 1)); // Calculate total cost
    }, 0).toFixed(2); // Return total cost rounded to 2 decimal places
  };
 


const Products = () => { // Main Products component that displays products and manages the shopping cart
  let token = localStorage.getItem("token"); // Get the token from localStorage to check if the user is authenticated
  let username = localStorage.getItem("username"); // Get the username from localStorage to display in the UI
  

  const [filteredProducts, setFilteredProducts] = useState([]);  // State to hold the filtered products based on search input
  const [cartItems, setCartItems] = useState([]); // State to hold the items in the shopping cart
  const [cartRestored, setCartRestored] = useState(false); // State to track if the cart has been restored from localStorage

  const products = useRouteLoaderData("products"); // Use useRouteLoaderData to get the products data loaded by the route. 
  // And this will be the data fetched by the loader function defined in the router configuration


  useEffect(() => { // Effect to set the initial filtered products when the products data is loaded
    setFilteredProducts(products); // Set the filtered products to the initial products data
  }, [products]); // When products change, update the filtered products
  // This ensures that the filtered products are always in sync with the products data loaded by the route

  
   

  // Restore cart items from localStorage when products are loaded
  useEffect(() => { // Effect to restore cart items from localStorage when products are loaded
    if(products?.length && !cartRestored) { // Only restore if products are available and cart is not already restored
      const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || []; // Get saved cart items from localStorage
      const restoredCart = savedCartItems.map((item) => { // Map through each saved item to restore the cart
        const product = products.find((p) => p["_id"] === item["_id"]); // Find the product in the products array using the item ID
        if (product) { // If product exists, return a new object with the product details and quantity
          return { ...product, quantity: item.quantity || 1 }; // Ensure quantity is set
        }
        return null; // If product not found, return null
      }).filter(Boolean); // Filter out null values
      setCartItems(restoredCart); // Set the restored cart items to the cartItems state
      setCartRestored(true); // Set cartRestored to true after restoring
      console.log("Restored Cart Items:", restoredCart); // Log the restored cart items for debugging
    }
  }, [products, cartRestored]); // Run this effect when products are loaded or cartRestored changes



 useEffect(() => { // Effect to save cart items to localStorage whenever cartItems changes
  if (cartRestored) { // Only save to localStorage if the cart has been restored
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Save cart items to localStorage as a JSON string
  }
}, [cartItems, cartRestored]); // This ensures that the cart items are always in sync with the localStorage whenever they change




 


  const handleCart = (productId) => {  // Function to handle adding products to the cart
    const product = products.find((p) => p["_id"] === productId); // Find the product in the products array
    if (product) { // If product exists, proceed to add to cart
      setCartItems((prevItems) => { // Update cart items
        const existingItem = prevItems.find((item) => item["_id"] === productId); // Check if the item already exists in the cart
        if (existingItem) {
          // If item already exists, increase quantity
          return prevItems.map((item) => // Map through previous items to update the quantity of the existing item
            item["_id"] === productId
              ? { ...item, quantity: (item.quantity || 1) + 1 } // Increase quantity by 1, ensuring it starts at 1 if not defined
              : item  // Keep other items unchanged
          );  
        } else {
          // If item doesn't exist, add it to cart
          return [...prevItems, { ...product, quantity: 1 }]; // Add new item with quantity set to 1
        }
      });
    }
  };

  const handleUpdateQuantity = (productId, quantity) => { // Function to handle updating the quantity of items in the cart
    setCartItems((prevItems) => { // Update cart items based on the product ID and new quantity
      return prevItems.map((item) => // Map through previous items to find the item to update
        item["_id"] === productId ? { ...item, quantity: quantity } : item // Keep other items unchanged. And update quantity for the specific item
      ).filter((item) => item.quantity > 0);  // Filter out items with quantity greater than 0 to remove items with zero quantity
    });
  };

  const handleSearch = (event) => { // Function to handle search input changes
    const searchTerm = event.target.value.toLowerCase(); // Get the search term from the input field

    const filtered = products.filter((product) => // Filter products based on the search term
      product.name.toLowerCase().includes(searchTerm) || // Filter products by name
      product.category.toLowerCase().includes(searchTerm) // Filter products by category
    );
    setFilteredProducts(filtered); // Update the filtered products state
  };


  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}> {/* Main container with flex layout to allow header, main content, and footer to stack vertically */}
      <Header> {/* Header component that includes the logo and search bar */}
        <TextField  // Search input field for filtering products
          className="search-desktop"
          size="small"
          fullWidth
          placeholder="Search for items/categories"
          name="search"
          onChange={handleSearch} // Handle search input changes
          slotProps={{ // Slot props for customizing the input field
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Header>

      {/* Main Layout: Products + Cart side by side */}
      <Box // Main layout container with flexbox to display products and cart side by side
        sx={{ // Flexbox layout to display products and cart side by side
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 2,
          padding: 2,
          flexGrow: 1,
        }}
      >
        {/* LEFT: Products */}
        <Box sx={{ flex: 3 }}> {/* Flexbox container for products section */}
          <Box className="hero" my={2}>
            <p className="hero-heading">
              India's <span className="hero-highlight">FASTEST DELIVERY</span>{" "} {/* Hero section with a heading and highlight */}
              to your door step
            </p>
          </Box>

          <Box display="flex" flexWrap="wrap" gap={2}> {/* Flexbox container to display products in a grid layout */}
            {filteredProducts.map((product) => ( // Map through filtered products to display each product card
              <Card key={product["_id"]} sx={{ width: "300px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}> {/* Card component to display product information */}
                <CardMedia // CardMedia component to display product image
                  component="img"
                  alt={product.name}
                  height="140"
                  image={product.image}
                />
                <CardContent> {/* CardContent component to display product details */}
                  <Typography variant="h6">{product.name}</Typography>  
                  <Typography variant="body2">{product.description}</Typography> 
                  <Typography variant="body2">Price: ${product.cost}</Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <Rating value={product.rating} size="small" readOnly />
                    <Box ml={1}>({product.rating})</Box>
                  </Box>
                </CardContent>
                <CardActions> {/* CardActions component to display action buttons */}
                  <Button // Button to add product to cart
                    onClick={(event) => handleCart(product["_id"])} 
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<AddShoppingCartOutlined />}
                  >
                    Add to Cart {/* Button text */}
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>

        {/* RIGHT: Cart */}
        {
          <Box // Flexbox container for cart section
            sx={{
              flex: 1,
              backgroundColor: "#E9F5E1",
              padding: 2,
            }}
          >
           {username && <Cart items={cartItems} onUpdateQuantity={handleUpdateQuantity} />} {/* Cart component to display items in the cart */}
          </Box>
        }
      </Box>

       
    </div>
  );
};

export default Products; // Exporting the Products component as the default export of this module

export const loader = async () => { // Loader function to fetch products data from the API
  // This function will be called by the router to load data before rendering the Products component
  // It fetches the products from the API endpoint and returns the data as JSON
  // If the fetch fails, it throws an error to be handled by the router
  // This is used to ensure that the Products component has the necessary data before it is rendered
  const response = await fetch(`${API_URL}/api/v1/products`); // Fetching products from the API endpoint
  if (!response.ok) { // Check if the response is not OK (status code not in the range 200-299)
    throw new Error("Failed to fetch products"); // Throw an error if the fetch fails
  }
  return await response.json(); // Return the fetched products data as JSON
};

 
