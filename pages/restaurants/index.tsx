import { useState, useEffect, useMemo } from 'react'
import type { NextPage } from 'next'
// import { useRouter } from 'next/router'
import Image from 'next/image'
import Head from 'next/head'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from '@tanstack/react-query'
import { IInfinitePage } from '../../src/lib/interfaces/IInfinitePage'
import { IRestaurant } from '../../src/lib/interfaces/IRestaurant'
import DataTable from '../../src/components/DataTable'
import { ColumnDef } from '@tanstack/react-table'
import { ThreeDots } from 'react-loader-spinner'
import requestService from '../../src/services/request'
import DiscountColumn from '../../src/components/restaurants/discountColumn'
import LinkToRestaurantDetails from '../../src/components/restaurants/linkToRestaurantDetails'
import FoodType from '../../src/components/restaurants/foodType'
import DiningType from '../../src/components/restaurants/diningType'
import LoadingState from '../../src/components/restaurants/loadingState'
import RestaurantsFilterPane from '../../src/components/restaurants/filterPane'
import { FiltersPaneInfoProvider } from './contexts/filters'
// import { getQueryString } from '../../src/lib/utilities/object'

import styles from './index.module.css'
// import { camelizeObject } from '../../src/lib/utilities/object'

const Styles = styled.div`
  .table-wrapper {
    margin: 1rem;
  }
  & > .table-wrapper:not(:first-of-type) {
    margin: -1rem 1rem 0;
    table {
      border-top: 0;
    }
    table th {
      display: none;
    }
  }
  table {
    border-spacing: 0;

    thead tr {
      background: #f6f7f8;
      padding: 5px;
      border-radius: 4px;
      th: first-of-type {
        border-radius: 8px 0 0 8px;
      }
      th:last-of-type {
        border-radius: 0 8px 8px 0;
      }
    }

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th {
      position: relative;
      font-size: 12px;
      font-weight: 700;
      color: #80838f;
      padding: 0.6rem 1rem;
      border: 1px solid transparent;
    }

    th,
    td {
      margin: 0;
      text-align: left;
      font-size: 14px;
      color: #80838f;
      white-space: nowrap;

      :last-child {
        border-right: 0;
      }
    }

    td {
      border-bottom: 1px solid #80838f33;
      padding: 1rem;
    }
  }
`

const Restaurants: NextPage = () => {
  const { ref, inView } = useInView()
  // const { query } = useRouter()
  // const queryParams = camelizeObject(query)

  // const filtersDict = useMemo(() => {
  //   const filtersDictSpecs = [
  //     {
  //       field: 'cuisine',
  //       predicate: 'in',
  //     },
  //     {
  //       field: 'city',
  //       predicate: 'eq',
  //     },
  //     {
  //       field: 'pureVeg',
  //       predicate: 'eq',
  //     },
  //     {
  //       field: 'takeAwayOnly',
  //       predicate: 'eq',
  //     },
  //     {
  //       field: 'swiggySuperDiscount__gte',
  //       predicate: '>=',
  //     },
  //   ]
  //   const filters: any = {
  //     and: [],
  //   }
  //   filtersDictSpecs.forEach((spec) => {
  //     if (spec.field in query) {
  //       try {
  //         filters.and.push({
  //           [spec.predicate]: [
  //             {
  //               var: spec.field,
  //             },
  //             JSON.parse(query[spec.field]),
  //           ],
  //         })
  //       } catch {
  //         filters.and.push({
  //           [spec.predicate]: [
  //             {
  //               var: spec.field,
  //             },
  //             query[spec.field],
  //           ],
  //         })
  //       }
  //     }
  //   })
  //   return filters
  // }, [queryParams])

  const columns = useMemo(() => {
    const defaultColumns: ColumnDef<IRestaurant>[] = [
      {
        accessorKey: 'name',
        cell: (info) => (
          <LinkToRestaurantDetails restaurant={info.row.original} />
        ),
        header: () => <span>Name</span>,
        size: 450,
        minSize: 100,
      },
      {
        accessorKey: 'cuisine',
        cell: (info) => info.getValue(),
        header: () => <span>Cuisine</span>,
        footer: (props) => props.column.id,
        size: 250,
        minSize: 100,
      },
      {
        accessorKey: 'city',
        cell: (info) => info.getValue(),
        header: () => <span>City</span>,
      },
      {
        accessorKey: 'pureVeg',
        cell: (info) => <FoodType pureVeg={info.getValue() as boolean} />,
        header: () => <span>Food Type</span>,
      },
      {
        accessorKey: 'takeAwayOnly',
        cell: (info) => (
          <DiningType takeAwayOnly={info.getValue() as boolean} />
        ),
        header: () => <span>Dining Type</span>,
      },
      {
        accessorKey: 'swiggySuperDiscountPercentage',
        cell: (info) => <DiscountColumn discount={info.getValue() as number} />,
        header: () => <span>Swiggy Super Discount</span>,
      },
    ]
    return defaultColumns
  }, [])

  const fetchRestaurants = async ({ pageParam = 0 }) => {
    const response = await requestService.get(`restaurants?cursor=${pageParam}`)
    return response
  }

  const {
    isError,
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<IInfinitePage, Error>(
    ['restaurants'],
    fetchRestaurants,
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    }
  )

  const [restaurants, setRestaurants] = useState<IRestaurant[]>(
    [] as IRestaurant[]
  )

  const restaurantsCount = data?.pages[0].count

  useEffect(() => {
    const restaurantsList = [] as IRestaurant[]
    data?.pages.map((page) => {
      restaurantsList.push(page.data)
    })
    setRestaurants(() => restaurantsList.flat())
  }, [data])

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  return (
    <>
      <Head>
        <title>Swiggy Ops</title>
        <meta name="description" content="Swiggy Operations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading ? (
        <div className="container loading-container u-hv-centered-container">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#999"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : (
        <div className="container">
          <div className={`u-flex ${styles.swiggy_ops__restaurants}`}>
            <div className={styles.swiggy_ops__restaurants_left_pane}>
              <div className="u-vertically-centered-container u-spaced-out-container">
                <p className={styles.swiggy_ops__restaurants_count}>
                  {restaurantsCount} Restaurants
                </p>
                <div
                  className={`u-vertically-centered-container u-spaced-out-container ${styles.swiggy_ops__restaurants_search_box_container}`}
                >
                  <input
                    type="search"
                    placeholder="Search Restaurants"
                    className={`${styles.swiggy_ops__restaurants_search_box}`}
                  />
                  <Image
                    src={`https://file.rendit.io/n/WrUEeNlM0w7GL9kvkrrX.svg`}
                    alt="search-icon"
                    width="16"
                    height="16"
                  />
                </div>
              </div>
              <Styles className={styles.swiggy_ops__restaurants_list}>
                <DataTable columns={columns} data={restaurants} />
                {hasNextPage && (
                  <div
                    ref={ref}
                    style={{ height: '10px', marginTop: '10px' }}
                  ></div>
                )}
                {isFetchingNextPage && (
                  <div>
                    <LoadingState />
                  </div>
                )}
              </Styles>
            </div>
            <FiltersPaneInfoProvider value={filtersDict}>
              <RestaurantsFilterPane />
            </FiltersPaneInfoProvider>
          </div>
        </div>
      )}
    </>
  )
}

export default Restaurants
