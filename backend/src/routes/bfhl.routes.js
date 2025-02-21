import express from "express";
import { bfhlPost, bfhlGet } from "../controllers/bfhl.controller.js";
const router = express.Router();

router.route("/").post(bfhlPost).get(bfhlGet);

export default router;
