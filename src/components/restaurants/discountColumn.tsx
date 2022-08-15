import React from 'react'
import styled from 'styled-components'
interface IDiscountColumnProps {
  discount: number
}

export const StyledDiscountIndicatorLine = styled.div`
  width: 60px;
  background-color: rgb(241 87 0 / 10%);
  border-radius: 4px;
  margin: 0 15px;
`

export const StyledDiscountIndicator = styled.div<IDiscountColumnProps>`
  ${({ discount }) =>
    `width: ${discount}%;
    height: 3px;
    background: #f15700;
    border-radius: 4px;`}
`

const DiscountColumn = ({ discount }: IDiscountColumnProps) => {
  return (
    <div className="u-vertically-centered-container">
      <div>{discount}%</div>
      <StyledDiscountIndicatorLine className="u-vertically-centered-container">
        <StyledDiscountIndicator discount={discount} />
      </StyledDiscountIndicatorLine>
    </div>
  )
}

export default DiscountColumn
