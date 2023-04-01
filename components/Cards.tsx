import React, { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import axios from "axios";

interface Props {
  cardList: Prisma.cardSelect[];
  bucketId: number | undefined | boolean;
  getBucketList: () => Promise<void>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setLink: React.Dispatch<React.SetStateAction<string>>;
}

const Cards = ({
  cardList,
  bucketId,
  getBucketList,
  setShowModal,
  setLink,
}: Props) => {
  const [cardName, setCardName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [updatedCardName, setUpdatedCardName] = useState("");
  const [updatedUrl, setUpdatedUrl] = useState("");
  const [isEditabe, setIsEditable] = useState<boolean | number | undefined>(
    false
  );

  const createCardHandler = async () => {
    if (cardName === "" || url === "") return;
    try {
      const res = await axios.post("https://card-bucket.vercel.app/api/cards/create", {
        cardName: cardName,
        link: url,
        bucketId: bucketId,
      });
      console.log(res.data);
      getBucketList();
      setCardName("");
      setUrl("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCardHandler = async (id: number) => {
    try {
      const res = await axios.post("https://card-bucket.vercel.app/api/cards/delete", {
        cardId: id,
      });
      console.log(res.data);
      getBucketList();
    } catch (error) {
      console.log(error);
    }
  };

  const updateCardHandler = async (
    id: number,
    prevName: string,
    prevUrl: string
  ) => {
    try {
      const res = await axios.post("https://card-bucket.vercel.app/api/cards/update", {
        cardId: id,
        newCardName: updatedCardName || prevName,
        newLink: updatedUrl || prevUrl,
      });
      console.log(res.data);
      getBucketList();
      setIsEditable(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col border border-white">
        <span>Create a new Card</span>
        <label htmlFor="name">Card Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => {
            setCardName(e.target.value);
          }}
          value={cardName}
        />
        <label htmlFor="link">Link Url</label>
        <input
          type="text"
          name="link"
          id="link"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          value={url}
        />
        <button
          type="button"
          onClick={createCardHandler}
          className="border border-white"
        >
          Create
        </button>
      </div>
      {cardList.map((card, i) => {
        return (
          <div key={i} className="border border-white">
            <div className="flex flex-col">
              {isEditabe !== card.id && (
                <div
                  className="flex flex-col"
                  onClick={() => {
                    setShowModal(true);
                    setLink(String(card.url));
                  }}
                >
                  <span>{card.name}</span>
                  <span>{card.url}</span>
                </div>
              )}
              {isEditabe == card.id && (
                <div className="flex flex-col">
                  <input
                    type="text"
                    name=""
                    id=""
                    defaultValue={String(card.name)}
                    disabled={isEditabe !== card.id}
                    onChange={(e) => setUpdatedCardName(e.target.value)}
                  />
                  <input
                    type="text"
                    name=""
                    id=""
                    defaultValue={String(card.url)}
                    disabled={isEditabe !== card.id}
                    onChange={(e) => setUpdatedUrl(e.target.value)}
                  />
                </div>
              )}
            </div>
            <button
              type="button"
              className="border border-gray-300"
              onClick={() => {
                if (isEditabe === card.id) {
                  setIsEditable(false);
                } else {
                  setIsEditable(card.id);
                }
              }}
            >
              {isEditabe === card.id ? "Cancel" : "Edit"}
            </button>
            <button
              type="button"
              onClick={() => {
                deleteCardHandler(Number(card.id));
              }}
              className="border border-red-600"
            >
              Delete
            </button>
            {isEditabe === card.id && (
              <button
                type="button"
                onClick={() => {
                  updateCardHandler(
                    Number(card.id),
                    String(card.name),
                    String(card.url)
                  );
                }}
                className="border border-gray-600"
              >
                Update
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
