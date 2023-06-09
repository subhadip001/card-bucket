import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { GetServerSideProps } from 'next'
import { PrismaClient, Prisma } from "@prisma/client";
import Bucket from '@/components/Bucket'
import { useEffect, useState } from 'react'
import axios from 'axios'

const prisma = new PrismaClient()

interface Props {
  buckets: Prisma.bucketSelect[]
}

export default function Home({ buckets }: Props) {

  const [bucketName, setBucketName] = useState<string>("")
  const [bucketList, setBucketList] = useState([])

  const getBucketList = async () => {
    try {
      const res = await axios.get("https://card-bucket.vercel.app/api/bucket")
      console.log(res.data)
      setBucketList(res.data)
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    getBucketList()
  }, [])

  const addBucketHandler = async () => {
    if (bucketName === "") return
    try {
      const res = await axios.post("https://card-bucket.vercel.app/api/bucket/create", {
        name: bucketName
      })
      setBucketName("")
      getBucketList()
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <Head>
        <title>Card Bucket</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-[90%] h-[100vh] mx-auto flex">
        <div className='flex w-[20%]'>
          <span>History</span>
        </div>
        <div className='w-[80%] flex flex-col gap-8'>
          <div className='flex w-full mx-auto gap-4'>
            <div className='flex flex-col w-[90%]'>
              <label className='' htmlFor="bucketName">Create a Bucket</label>
              <input type="text" className="h-10 px-3" placeholder='Type your bucket name' name="bucketName" id="bucketName" value={bucketName} onChange={(e) => { setBucketName(e.target.value) }} />
            </div>
            <button type="submit" onClick={addBucketHandler} className="border w-[10%] border-white">Create Bucket</button>
          </div>
          <Bucket buckets={bucketList} getBucketList={getBucketList} />
        </div>
      </main>
    </>
  )
}


// export const getServerSideProps: GetServerSideProps = async () => {
//   const buckets = await prisma.bucket.findMany()
//   return {
//     props: {
//       buckets: buckets
//     }
//   }
// }
