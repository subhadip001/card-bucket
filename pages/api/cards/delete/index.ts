import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient()


export default async function handler (req : NextApiRequest , res:NextApiResponse){
    const { cardId } = req.body
    console.log(cardId)
    const deletedItem = await prisma.card.delete({
        where :{
            id : Number(cardId)
        },
    })

    res.json(deletedItem)
    
}