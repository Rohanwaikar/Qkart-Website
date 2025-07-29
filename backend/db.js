// db.js
import nedb from 'nedb'; // NeDB is a lightweight JavaScript database

const users = new nedb({ // Create a new NeDB instance for users
  filename: 'db/users.db',
  autoload: true,
});

const products = new nedb({ // Create a new NeDB instance for products
  filename: 'db/products.db',
  autoload: true,
});

export { users, products }; // Export the users and products databases for use in other modules
