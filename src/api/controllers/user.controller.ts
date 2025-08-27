import prisma from "../../../lib/prisma";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
        },
    });
    res.status(201).json(newUser);
};