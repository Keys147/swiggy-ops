import React from 'react'
import Image from 'next/image'

const FoodType = ({ pureVeg }: { pureVeg: boolean }) => {
  return (
    <div>
      <span className="u-icon-right-margin">
        <Image
          src="/assets/svgs/pure-veg.svg"
          alt="Pure Veg Restaurant"
          width="14"
          height="14"
        />
      </span>

      {!pureVeg && (
        <Image
          src="/assets/svgs/non-veg.svg"
          alt="Non Veg Restaurant"
          width="14"
          height="14"
        />
      )}
    </div>
  )
}

export default FoodType
