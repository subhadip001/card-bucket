import React from 'react'
import { Prisma } from "@prisma/client";

interface Props{
  cardList : Prisma.cardSelect[]
}

const Cards = ({cardList} : Props) => {
  return (
    <div>
      {cardList.map((card,i)=>{
        return(
          <div key={i}>
            {card.name}
          </div>
        )
      })}
    </div>
  )
}

export default Cards