import { Box, Button } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";



const Cart = ({ items = [], onUpdateQuantity }) => {
  const navigate = useNavigate();
  if (!items.length)
    return (
      <Box className="cart empty" textAlign="center">
        <ShoppingCartOutlined
          className="empty-cart-icon"
          sx={{ fontSize: 48, color: "#888" }}
        />
        <Box color="#555" mt={1}>
          <h2>Your Cart is Empty</h2>
          <p>Add items to your cart to get started.</p>
        </Box>
      </Box>
    );
   

  return (
    <Box className="cart" sx={{ padding: 1, backgroundColor: "#fff", borderRadius: 2 }}>
      <h2>Your Cart</h2>
      {items.map((item) => (
        <Box key={item["_id"]} sx={{ marginBottom: 2, padding: 1, borderBottom: "1px solid #ddd" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={2}>
              <img style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }} src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </Box>
            <Box display="flex" alignItems="center">
              <Button onClick={() => onUpdateQuantity(item["_id"], (item.quantity || 1) - 1)}>-</Button>

              <span style={{ margin: "0 0.1px" }}>
                {item.quantity || 1}
              </span>
              <Button onClick={() => onUpdateQuantity(item["_id"], (item.quantity || 1) + 1)}>+</Button>
              <p >${item.cost}</p>
              
            </Box>

          </Box>
          
        </Box>  
      ))}
      <Box>
            <p>Order total: ${items.reduce((total, item) => total + (item.cost * (item.quantity || 1)), 0).toFixed(2)}</p>
          </Box>
      <Box>
            <Button variant="contained" color="primary" onClick={() => navigate("/checkout")} sx={{ width: "100%" }}>
              <ShoppingCartOutlined /> Checkout
            </Button>
          </Box>
      {/* Add more cart functionalities like checkout, total price, etc. */}
    </Box>
  );

  // Full cart view (not implemented in this example)
};

export default Cart;
