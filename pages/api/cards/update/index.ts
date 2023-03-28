import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient()


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {cardId , newCardName, newLink } = req.body
    const result = await prisma.card.update({
        where :{
            id : cardId
        },
        data: {
            name: newCardName,
            url: newLink
        }
    })

    res.json(result)

}