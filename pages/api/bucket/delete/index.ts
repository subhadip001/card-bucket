import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient()


export default async function handler (req : NextApiRequest , res:NextApiResponse){
    const {bucketId} = req.body
    console.log(bucketId)
    const deletedItem = await prisma.bucket.delete({
        where :{
            id : Number(bucketId)
        },
    })

    res.json(deletedItem)
    
}