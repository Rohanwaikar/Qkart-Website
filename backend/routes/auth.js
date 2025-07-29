import express from 'express'; // Importing express for routing
import crypto from 'crypto'; // Importing crypto for hashing passwords
import jwt from 'jsonwebtoken'; // Importing jsonwebtoken for creating JWT tokens
import config from '../config.json' with { type: 'json' }; // Importing configuration settings
import { users } from '../db.js'; // Importing the users collection from the database

const router = express.Router(); // Create a new router instance


const sha256 = (input) => { // Function to hash input using SHA-256
    return crypto.createHash('sha256').update(input).digest('hex');  // Hashing the input
};

router.post('/register', (req, res) => {  // Route for user registration
    const { username, password } = req.body; // Destructuring username and password from request body
    console.log(`POST request to "/auth/register" received for user: ${username}`);  // Log the registration attempt
    if (!username || !password) { // Check if username and password are provided
        return res.status(400).json({ error: 'Username and password are required' }); // Respond with a 400 status code if not
    }

    users.findOne({ username }, (err, existingUser) => { // Check if the user already exists
        if (err) {      // Error handling for database query
            console.error('Error occurred while checking for existing user:', err); // Log the error
            return res.status(500).json({ error: 'Internal server error' }); // Respond with a 500 status code
        }

        if (existingUser) { // If user already exists, return a 409 conflict status
            return res.status(409).json({ error: 'User with this username already exists' });
        }

        // Hash the password
        const hashedPassword = sha256(password); // Hash the password using SHA-256

        // Create a new user
        const newUser = { // Create a new user object
            username, // Assign the username
            password: hashedPassword, // Assign the hashed password
        };

        users.insert(newUser, (err) => { // Insert the new user into the database
            if (err) { // Error handling for insertion
                console.error('Error occurred while registering user:', err); // Log the error
                return res.status(500).json({ error: 'Internal server error' }); // Respond with a 500 status code
            }
            console.log(`User ${username} registered successfully`); // Log successful registration
            const token = jwt.sign({ username }, config.jwtSecret, { expiresIn: '1h' }); // Generate JWT token
            return res.status(201).json({ message: 'User registered successfully', token, username }); // Respond with success message and token
        });
    });
});

router.post('/login', (req, res) => { // Route for user login
    const { username, password } = req.body; // Destructuring username and password from request body
    console.log(`POST request to "/auth/login" received for user: ${username}`); // Log the login attempt
    if (!username || !password) { // Check if username and password are provided
        return res.status(400).json({ error: 'Username and password are required' }); // Respond with a 400 status code if not
    }

    users.findOne({ username }, (err, user) => { // Find the user in the database
        if (err) { // Error handling for database query
            console.error('Error occurred while finding user:', err); // Log the error
            return res.status(500).json({ error: 'Internal server error' }); // Respond with a 500 status code
        }

        if (!user || user.password !== sha256(password)) { // Check if user exists and password matches
            return res.status(401).json({ error: 'Invalid username or password' }); // Respond with a 401 unauthorized status if not
        }

        // Generate JWT token
        const token = jwt.sign({ username: user.username }, config.jwtSecret, { expiresIn: '1h' }); // Create a JWT token with username and expiration time

        console.log(`User ${username} logged in successfully`);
        return res.status(200).json({ message: 'Login successful', token, username: user.username }); // Respond with success message, token, and username
    });
});

export default router; // Exporting the router to be used in the main application