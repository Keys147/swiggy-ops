import { IRestaurant } from './IRestaurant'

export interface IPage {
  restaurants: IRestaurant[]
  hasMore: boolean
}

export interface IInfinitePage {
  nextCursor: number | undefined
  page: IPage
}
