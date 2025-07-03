import express from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../config.json' with { type: 'json' };
import { users } from '../db.js';

const router = express.Router();


const sha256 = (input) => {
    return crypto.createHash('sha256').update(input).digest('hex');
};

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    console.log(`POST request to "/auth/register" received for user: ${username}`);
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    users.findOne({ username }, (err, existingUser) => {
        if (err) {
            console.error('Error occurred while checking for existing user:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (existingUser) {
            return res.status(409).json({ error: 'User with this username already exists' });
        }

        // Hash the password
        const hashedPassword = sha256(password);

        // Create a new user
        const newUser = {
            username,
            password: hashedPassword,
            balance: 0 // Initialize balance to 0
        };

        users.insert(newUser, (err) => {
            if (err) {
                console.error('Error occurred while registering user:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            console.log(`User ${username} registered successfully`);
            const token = jwt.sign({ username }, config.jwtSecret, { expiresIn: '1h' }); // Generate JWT token
            return res.status(201).json({ message: 'User registered successfully', token, username, balance: 0 });
        });
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`POST request to "/auth/login" received for user: ${username}`);
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    users.findOne({ username }, (err, user) => {
        if (err) {
            console.error('Error occurred while finding user:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (!user || user.password !== sha256(password)) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ username: user.username }, config.jwtSecret, { expiresIn: '1h' });

        console.log(`User ${username} logged in successfully`);
        return res.status(200).json({ message: 'Login successful', token, username: user.username, balance: user.balance });
    });
});

export default router;