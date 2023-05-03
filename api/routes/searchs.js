import express from 'express';
import { searchUsers } from '../controllers/search.js';

const router = express.Router();

router.get('/', (req, res) => {
  console.log("Search route received:", req.query.query);
  
    // Make sure that the query parameter is provided
    if (!req.query.query) {
      return res.status(400).json({ error: 'No search query provided' });
    }
  
    searchUsers(req, res);
  });

export default router;
