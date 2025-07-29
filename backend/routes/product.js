// routes/product.js
import express from 'express'; // Import express to create a router
import { products } from '../db.js'; // .js extension needed

const router = express.Router();  // Create a new router instance

router.get('/', (req, res) => { // Define a route to get all products
  products.find({}, (err, docs) => { // Query the products collection. Use find() to get all documents
    if (err) { // If there's an error during the query
      return res.status(500).json({ error: 'Internal server error' }); // Send a 500 status with an error message
    }
    res.json(docs); // Send the retrieved documents as a JSON response
  });
});

export default router; // Export the router to be used in other files
