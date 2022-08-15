import { NextApiRequest, NextApiResponse } from 'next'
import { IRestaurant } from '../../../src/lib/interfaces/IRestaurant'
import { faker } from '@faker-js/faker'

const restaurantsList = [
  {
    name: 'Adyar Anandha Bhavan',
    cuisine: 'South Indian',
    city: 'Chennai',
    pure_veg: true,
    take_away_only: false,
    swiggy_super_discount_percentage: 40,
  },
  {
    name: 'Saravana Bhavan',
    cuisine: 'South Indian',
    city: 'Chennai',
    pure_veg: true,
    take_away_only: false,
    swiggy_super_discount_percentage: 60,
  },
  {
    name: 'Sangeethas',
    cuisine: 'South Indian',
    city: 'Chennai',
    pure_veg: true,
    take_away_only: false,
    swiggy_super_discount_percentage: 50,
  },
  {
    name: 'Pind',
    cuisine: 'North Indian',
    city: 'Chennai',
    pure_veg: true,
    take_away_only: false,
    swiggy_super_discount_percentage: 60,
  },
  {
    name: 'Subway',
    cuisine: 'American',
    city: 'Chennai',
    pure_veg: false,
    take_away_only: false,
    swiggy_super_discount_percentage: 20,
  },
  {
    name: 'Faasos',
    cuisine: 'Fusion',
    city: 'Chennai',
    pure_veg: false,
    take_away_only: false,
    swiggy_super_discount_percentage: 30,
  },
  {
    name: 'KFC',
    cuisine: 'Fusion',
    city: 'Chennai',
    pure_veg: false,
    take_away_only: false,
    swiggy_super_discount_percentage: 30,
  },
  {
    name: 'Aasife',
    cuisine: 'South Indian',
    city: 'Chennai',
    pure_veg: false,
    take_away_only: false,
    swiggy_super_discount_percentage: 40,
  },
  {
    name: 'Thalapakatti',
    cuisine: 'South Indian',
    city: 'Chennai',
    pure_veg: false,
    take_away_only: false,
    swiggy_super_discount_percentage: 20,
  },
  {
    name: 'Mexe',
    cuisine: 'Mexican',
    city: 'Chennai',
    pure_veg: false,
    take_away_only: false,
    swiggy_super_discount_percentage: 20,
  },
  {
    name: 'Wok Box',
    cuisine: 'Chinese',
    city: 'Chennai',
    pure_veg: false,
    take_away_only: false,
    swiggy_super_discount_percentage: 20,
  },
]

const cuisinesListOptions = [
  'South Indian',
  'North Indian',
  'Mexican',
  'American',
  'Chinese',
]

const RestaurantsInfiniteQueryResponse = (
  request: NextApiRequest,
  response: NextApiResponse<
    | {
        restaurants: IRestaurant[]
        nextId: number | null
        previousId: number | null
      }
    | Error
  >
): void => {
  const {
    query: { cursor },
  } = request
  const _cursor = cursor ? +cursor : 0
  const pageSize = 20

  const data = Array(pageSize)
    .fill(0)
    .map((_, i) => {
      const id = i + _cursor
      if (restaurantsList[id]) {
        return {
          id,
          ...restaurantsList[i],
        }
      } else {
        return {
          name: faker.company.companyName(),
          id,
          cuisine:
            cuisinesListOptions[
              Math.floor(Math.random() * cuisinesListOptions.length)
            ],
          city: 'Chennai',
          pure_veg: [true, false][Math.floor(Math.random() * 2)],
          take_away_only: [true, false][Math.floor(Math.random() * 2)],
          swiggy_super_discount_percentage: Math.floor(Math.random() * 100),
        }
      }
    })

  const nextId = _cursor < 100 ? data[data.length - 1].id + 1 : null
  const previousId = _cursor > -10 ? data[0].id - pageSize : null
  const count = 109 //hardcoded
  setTimeout(
    () => response.status(200).json({ data, nextId, previousId, count }),
    1000
  )
}

export default RestaurantsInfiniteQueryResponse
