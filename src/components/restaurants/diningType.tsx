import React from 'react'
import Image from 'next/image'

const DiningType = ({ takeAwayOnly }: { takeAwayOnly: boolean }) => {
  return (
    <div>
      <span className="u-icon-right-margin">
        <Image
          src="/assets/svgs/take-away.svg"
          alt="Take Away"
          width="14"
          height="14"
        />
      </span>

      {!takeAwayOnly && (
        <Image
          src="/assets/svgs/dining.svg"
          alt="Dining"
          width="14"
          height="14"
        />
      )}
    </div>
  )
}

export default DiningType
