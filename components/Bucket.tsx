import React from 'react'
import { Prisma } from "@prisma/client";
import Cards from './Cards';


interface Props {
    buckets: Prisma.bucketSelect[]
}

const Bucket = ({ buckets }: Props) => {
    return (
        <div>
            {
                buckets.map((bucket, i) => {
                    return (
                        <div key={i}>
                            <h1>{i + 1}. {bucket.name}</h1>
                            <Cards cardList={bucket.cards as Prisma.cardSelect[]} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Bucket