import express from "express";
import { 
  getRelationships, 
  addRelationship, 
  deleteRelationship, 
  getFollowersCount, 
  getFollowingCount 
} from "../controllers/relationship.js";

const router = express.Router();

router.get("/", getRelationships);
router.post("/", addRelationship);
router.delete("/", deleteRelationship);
router.get("/followers-count/:userId", getFollowersCount);
router.get("/following-count/:userId", getFollowingCount);

export default router;
