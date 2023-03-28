import React, { useState } from "react";
import { Prisma } from "@prisma/client";
import Cards from "./Cards";
import axios from "axios";
import Modal from "./Modal";

interface Props {
    buckets: Prisma.bucketSelect[];
    getBucketList: () => Promise<void>;
}

const Bucket = ({ buckets, getBucketList }: Props) => {
    const [showModal, setShowModal] = useState(false)
    const [link , setLink] = useState("")
    const deleteBucket = async (id: number) => {
        try {
            const res = await axios.post("http://localhost:5000/api/bucket/delete", {
                bucketId: id,
            });
            console.log(res.data);
            getBucketList();
        } catch (e) {
            //console.log(id)
            console.log(e);
        }
    };
    return (
        <>
            {showModal && <Modal setShowModal={setShowModal} url={link}  />}
            <div className="flex lg:flex-row w-full m-auto justify-between gap-10 flex-col">
                {buckets.map((bucket, i) => {
                    return (
                        <div key={i}>
                            <span>
                                {i + 1}. {bucket.name}{" "}
                                <button
                                    type="button"
                                    onClick={() => {
                                        deleteBucket(Number(bucket.id));
                                    }}
                                    className="border border-white"
                                >
                                    Delete
                                </button>
                            </span>
                            <Cards
                                cardList={bucket.cards as Prisma.cardSelect[]}
                                bucketId={bucket.id}
                                getBucketList={getBucketList}
                                setShowModal={setShowModal}
                                setLink={setLink}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Bucket;
