// db.js
import nedb from 'nedb';

const users = new nedb({
  filename: 'db/users.db',
  autoload: true,
});

const products = new nedb({
  filename: 'db/products.db',
  autoload: true,
});

export { users, products };
