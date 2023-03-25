import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient()


export default async function handler (req : NextApiRequest , res:NextApiResponse){
    const {name} = req.body
    const result = await prisma.bucket.create({
        data : {
            name : name
        }
    })

    res.json(result)
    
}