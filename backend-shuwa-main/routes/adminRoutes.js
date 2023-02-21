import express from "express";
const router = express.Router();
import {
  createLadies,
  deleteLadies,
  getLadies,
  updateLadies,
} from "../controllers/ladiesController.js";
import { verifyAccessToken } from "../helpers/jsonwebtoken.js";

router.post("", getLadies);
router.post("", verifyAccessToken, createLadies);
router.post("/:id", verifyAccessToken, updateLadies);
router.post("/:id", verifyAccessToken, deleteLadies);

export default router;
