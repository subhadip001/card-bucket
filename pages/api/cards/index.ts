import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient()

export default async function handler (req : NextApiRequest , res:NextApiResponse){
    const cards = await prisma.card.findMany()
    res.json(cards)    
}