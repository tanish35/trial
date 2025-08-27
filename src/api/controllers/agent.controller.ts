import { agent } from "supertest";
import prisma from "../../../lib/prisma";
import { Request, Response } from "express";


export const getAgents = async (req: Request, res: Response) => {
  const agents = await prisma.agent.findMany();
  res.status(200).json(agents);
};

export const createAgent = async (req: Request, res: Response) => {
  const { name, role } = req.body;
  if(!name || !role) {
    return res.status(400).json({ message: "Name and role are required" });
  }
  const newAgent = await prisma.agent.create({
    data: {
      name,
      role,
    },
  });
  res.status(201).json(newAgent);
};

export const updateAgentStatus = async (req: Request, res: Response) => {
  const {agentId, status} = req.body;
  if(!agentId || !status) {
    return res.status(400).json({ message: "Agent ID and status are required" });
  }
  status.toLowerCase();
  if (status !== "online" && status !== "offline") {
    return res.status(400).json({ message: "Status must be either 'online' or 'offline'" });
  }
  const updatedAgent = await prisma.agent.update({
    where: { agent_id: agentId },
    data: { status },
  });
  res.status(200).json(updatedAgent);
};

export const createConversation = async (req: Request, res: Response) => {
  const { agentId, userId } = req.body;
  if(!agentId || !userId) {
    return res.status(400).json({ message: "agentId and userId are required" });
  }
  const newConversation = await prisma.conversation.create({
    data: {
      agent_id: agentId,
      user_id: userId,
    },
  });
  res.status(201).json(newConversation);
};

export const getConversationsByAgent = async (req: Request, res: Response) => {
  const { agentId, limit } = req.body;
  if(!agentId) {
    return res.status(400).json({ message: "agentId is required" });
  }
  const conversations = await prisma.conversation.findMany({
    where: { agent_id: agentId },
    take: limit || 10,
    orderBy: { started_at: "desc" },
  })
  res.status(200).json(conversations);
}