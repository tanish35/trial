import express from "express";

const router = express.Router();

import {
  getAgents,
  createAgent,
  updateAgentStatus,
  createConversation,
  getConversationsByAgent,
} from "./controllers/agent.controller.js";

router.get("/", getAgents);
router.post("/", createAgent);
router.post("/status", updateAgentStatus);
router.post("/conversations", createConversation);
router.post("/conversations/agent", getConversationsByAgent);



export default router;
