import { IRestaurant } from './IRestaurant'

export interface IInfinitePage {
  data: IRestaurant[]
  previousId: number
  nextId: number
  count: number
}
