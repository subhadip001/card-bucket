import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient()


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { cardName, link, bucketId } = req.body
    const result = await prisma.card.create({
        data: {
            name: cardName,
            url: link,
            bucketId: Number(bucketId)
        }
    })

    res.json(result)

}