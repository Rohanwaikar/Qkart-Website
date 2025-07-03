// routes/product.js
import express from 'express';
import { products } from '../db.js'; // .js extension needed

const router = express.Router();

router.get('/', (req, res) => {
  products.find({}, (err, docs) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(docs);
  });
});

export default router;
