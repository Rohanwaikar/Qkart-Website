import { Button, Typography } from '@mui/material';
import { Box, Grid, Divider } from '@mui/material';
import '../components/Checkout.css';
import Header from './Header';
import { useState } from 'react';
import { getTotalCartValue } from '../components/Products'


const Checkout = () => { // Checkout component that handles the checkout process for the user

    const [addresses, setAddresses] = useState({ all: [], selected: "" }); // State to manage addresses, with an array for all addresses and a selected address
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || []; // Retrieve cart items from local storage or initialize as an empty array
    const [newAddress, setNewAddress] = useState({ // State to manage the new address being added
        isAddingNewAddress: false, // Flag to indicate if a new address is being added
        value: "", // The value of the new address input field
    });

    const addAddress = () => { // Function to add a new address
        if (newAddress.value) { // Check if the new address value is not empty
            setAddresses((prev) => ({ // Update the addresses state by adding the new address
                ...prev, // Spread the previous state
                all: [...prev.all, { id: Date.now(), name: newAddress.value }], // Add the new address with a unique ID based on the current timestamp
            }));
            setNewAddress({ isAddingNewAddress: false, value: "" }); // Reset the new address state after adding
        }
    };

    const handlePlaceOrder = () => { // Function to handle placing the order
        if (addresses.selected) { // Check if an address is selected
            alert(`Order placed successfully to ${addresses.selected.name}`); // Alert the user that the order has been placed successfully
            // Here you can add logic to handle order placement, e.g., API call
        }
    };

    const handleAddAddress = (e) => { // Function to handle changes in the new address input field
        setNewAddress({ ...newAddress, value: e.target.value }); // Update the new address value based on user input

    };
    const handleSelectAddress = (address) => { // Function to handle selecting an address
        setAddresses((prev) => ({ ...prev, selected: address })); // Update the addresses state to set the selected address
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