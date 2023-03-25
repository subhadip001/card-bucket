import React from 'react'
import { Prisma } from "@prisma/client";
import Card from './Card';


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
                            <h1>{i+1}. {bucket.name}</h1>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Bucket