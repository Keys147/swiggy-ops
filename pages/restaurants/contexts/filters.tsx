import { createContext, useContext } from 'react'

interface IFilterPaneProps {
  cusine: string[]
  pureVeg: string
  takeAwayOnly: string
  city: string
  swiggySuperDiscount__gte: string
}

const FiltersPaneInfoContext = createContext<IFilterPaneProps | undefined>(
  undefined
)

export const FiltersPaneInfoProvider = FiltersPaneInfoContext.Provider

export const useFiltersPaneContext = () => {
  const context = useContext(FiltersPaneInfoContext)
  if (!context) {
    throw new Error(
      'All filters sub components needs to be inside filter pane component'
    )
  }
  return context
}
