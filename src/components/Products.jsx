import { useRouteLoaderData } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Cart from "./Cart";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import { AddShoppingCartOutlined, Search } from "@mui/icons-material";
import "./Products.css";
import { useState, useEffect } from "react";




 export const getTotalCartValue = (cartItems = []) => {
    return cartItems.reduce((total, item) => {
      return total + (item.cost * (item.quantity || 1)); // Calculate total cost
    }, 0).toFixed(2); // Return total cost rounded to 2 decimal places
  };
 


const Products = () => {
  let token = localStorage.getItem("token");
  let username = localStorage.getItem("username");
  let balance = localStorage.getItem("balance");
  

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartRestored, setCartRestored] = useState(false);

  const products = useRouteLoaderData("products");
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // Restore cart items from localStorage on initial load
   

  // Restore cart items from localStorage when products are loaded
  useEffect(() => { // Check if products are loaded
    if(products?.length && !cartRestored) { // Only restore if products are available and cart is not already restored
      const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || []; // Get saved cart items from localStorage
      const restoredCart = savedCartItems.map((item) => {
        const product = products.find((p) => p["_id"] === item["_id"]);
        if (product) {
          return { ...product, quantity: item.quantity || 1 }; // Ensure quantity is set
        }
        return null; // If product not found, return null
      }).filter(Boolean); // Filter out null values
      setCartItems(restoredCart);
      setCartRestored(true); // Set cartRestored to true after restoring
      console.log("Restored Cart Items:", restoredCart);
    }
  }, [products, cartRestored]);

 useEffect(() => {
  if (cartRestored) {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
}, [cartItems, cartRestored]);




 


  const handleCart = (productId) => {
    const product = products.find((p) => p["_id"] === productId); // Find the product in the products array
    if (product) { // If product exists, proceed to add to cart
      setCartItems((prevItems) => { // Update cart items
        const existingItem = prevItems.find((item) => item["_id"] === productId); // Check if the item already exists in the cart
        if (existingItem) {
          // If item already exists, increase quantity
          return prevItems.map((item) =>
            item["_id"] === productId
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          );  
        } else {
          // If item doesn't exist, add it to cart
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });
    }
  };

  const handleUpdateQuantity = (productId, quantity) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item["_id"] === productId ? { ...item, quantity } : item // Keep other items unchanged. And update quantity for the specific item
      ).filter((item) => item.quantity > 0); // Filter out items with quantity less than or equal to 0
    });
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase(); // Get the search term from the input field

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm) || // Filter products by name
      product.category.toLowerCase().includes(searchTerm) // Filter products by category
    );
    setFilteredProducts(filtered); // Update the filtered products state
  };


  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header>
        <TextField
          className="search-desktop"
          size="small"
          fullWidth
          placeholder="Search for items/categories"
          name="search"
          onChange={handleSearch}
          slotProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Header>

      {/* Main Layout: Products + Cart side by side */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 2,
          padding: 2,
          flexGrow: 1,
        }}
      >
        {/* LEFT: Products */}
        <Box sx={{ flex: 3 }}>
          <Box className="hero" my={2}>
            <p className="hero-heading">
              India's <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
              to your door step
            </p>
          </Box>

          <Box display="flex" flexWrap="wrap" gap={2}>
            {filteredProducts.map((product) => (
              <Card key={product["_id"]} sx={{ width: "300px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="140"
                  image={product.image}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2">{product.description}</Typography>
                  <Typography variant="body2">Price: ${product.cost}</Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <Rating value={product.rating} size="small" readOnly />
                    <Box ml={1}>({product.rating})</Box>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={(event) => handleCart(product["_id"])} 
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<AddShoppingCartOutlined />}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>

        {/* RIGHT: Cart */}
        {
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#E9F5E1",
              padding: 2,
            }}
          >
           {username && <Cart items={cartItems} onUpdateQuantity={handleUpdateQuantity} />}
          </Box>
        }
      </Box>

      <Footer />
    </div>
  );
};

export default Products;

export const loader = async () => {
  const response = await fetch("http://localhost:3000/api/v1/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return await response.json();
};

 
