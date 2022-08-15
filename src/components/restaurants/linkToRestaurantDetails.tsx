import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { IRestaurant } from '../../lib/interfaces/IRestaurant'

export const StyledRestaurantLink = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #282c3f;
  cursor: pointer;
`
const LinkToRestaurantDetails = ({ restaurant }: IRestaurant) => {
  const { id, name } = restaurant
  return (
    <Link href={`/restaurants/${id}`}>
      <StyledRestaurantLink>{name}</StyledRestaurantLink>
    </Link>
  )
}

export default LinkToRestaurantDetails
