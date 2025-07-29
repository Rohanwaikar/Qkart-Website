// index.js
import express from 'express'; // Ensure you have the correct version of Node.js that supports ES Modules
import cors from 'cors'; // CORS middleware to allow cross-origin requests
import config from './config.json' with { type: 'json' }; // Import configuration from JSON file
import productRouter from './routes/product.js'; // must include .js extension
import authRouter from './routes/auth.js'; // must include .js extension

const app = express(); // Create an Express application

app.use(cors()); // Use CORS middleware to allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

app.use((req, res, next) => { //    Middleware to log incoming requests
  console.log(`Incoming ${req.method} request: ${req.originalUrl}`); // Log the request method and URL
  next(); // Call the next middleware in the stack
});


app.get('/', (req, res) => { // Root route handler
  res.send('API is running'); // Send a simple response for the root route
});

app.use('/api/v1/products', productRouter); // Use product router for handling product-related routes

app.use('/api/v1/auth', authRouter); // Use auth router for handling authentication-related routes

app.use((req, res) => { // Middleware to handle 404 errors
  res.status(404).send('Route not found'); // Send a 404 response for any unmatched routes
});

const port = process.env.PORT || config.port || 3000; // Set the port from environment variable or configuration file, default to 3000

app.listen(port, () => { // Start the server and listen on the specified port
  console.log(`Server is running on port ${port}`); // Log the port on which the server is running
});
