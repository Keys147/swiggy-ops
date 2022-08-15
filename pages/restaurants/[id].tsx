import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const RestaurantDetailsPage: NextPage = () => {
  const {
    query: { id },
  } = useRouter()

  return <div>Restaurant {id}</div>
}

export default RestaurantDetailsPage
