import express from "express";

import agents from "./agent.route";
import users from "./user.route";

const router = express.Router();

router.use("/agents", agents);
router.use("/users", users);

export default router;
