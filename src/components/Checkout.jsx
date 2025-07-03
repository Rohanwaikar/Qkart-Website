import { Button, Typography } from '@mui/material';
import { Box, Grid, Divider } from '@mui/material';
import '../components/Checkout.css';
import Header from './Header';
import { useState } from 'react';
import { getTotalCartValue } from '../components/Products'


const Checkout = () => {

    const [addresses, setAddresses] = useState({ all: [], selected: "" });
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const [newAddress, setNewAddress] = useState({
        isAddingNewAddress: false,
        value: "",
    });

    const addAddress = () => {
        if (newAddress.value) {
            setAddresses((prev) => ({
                ...prev,
                all: [...prev.all, { id: Date.now(), name: newAddress.value }],
            }));
            setNewAddress({ isAddingNewAddress: false, value: "" });
        }
    };

    const handlePlaceOrder = () => {
        if (addresses.selected) {
            alert(`Order placed successfully to ${addresses.selected.name}`);
            // Here you can add logic to handle order placement, e.g., API call
        }
    };

    const handleAddAddress = (e) => {
        setNewAddress({ ...newAddress, value: e.target.value });

    };
    const handleSelectAddress = (address) => {
        setAddresses((prev) => ({ ...prev, selected: address }));
    };

  return (
    <>
    <Header />
    <Grid container>
        <Grid item xs={12}  md={9}>
            <Box className="shipping-container" minHeight="100vh">
                <Typography color="#3C3C3C" variant="h4" my="1rem">
              Shipping
            </Typography>
            <Typography color="#3C3C3C" my="1rem">
              Manage all the shipping addresses you want. This way you won't
              have to enter the shipping address manually with every order.
              Select the address you want to get your order delivered.
            </Typography>
            <Box my="1rem">
              <Button variant="contained" color="primary" onClick={() => setNewAddress({ isAddingNewAddress: true, value: "" })}>
                Add New Address
              </Button>
              {newAddress.isAddingNewAddress && (
                <Box mt={2}>
                  <input
                    type="text"
                    placeholder="Enter new address"
                    value={newAddress.value}
                    onChange={handleAddAddress}

                  />
                  <Button onClick={addAddress}>Add</Button>
                </Box>
              )}
          </Box>
            <Divider />
            {addresses.all.length === 0 ? (
              <Typography my="1rem">
                No addresses found for this account. Please add one to proceed
              </Typography>
            ) : (
              addresses.all.map((address) => (
                <Box key={address.id} my="1rem">
                  <Button onClick={() => handleSelectAddress(address)}>{address.name}</Button>
                </Box>
              ))
            )}
            <Divider />
            <Typography my="1rem">
              Selected Address: {addresses.selected ? addresses.selected.name : "None"}
            </Typography>
             
            <Box my="1rem">
              <Typography variant="h6">Order Summary</Typography>
              <Typography>Total Items: {cartItems.length}</Typography>
              <Typography>Total Price: ${getTotalCartValue(cartItems)}</Typography>

              <Typography variant="h5">Grand Total: ${parseFloat(getTotalCartValue(cartItems))}</Typography>
            </Box>
            <Box my="1rem">
              <Typography variant="h6">Payment Method</Typography>
              <Typography>Cash</Typography>
              Pay ${parseFloat(getTotalCartValue(cartItems))}
              <Button onClick={handlePlaceOrder}>Place Order</Button>
            </Box>
            
            </Box>
    </Grid>
    </Grid>
    </>

  );
};
export default Checkout; 