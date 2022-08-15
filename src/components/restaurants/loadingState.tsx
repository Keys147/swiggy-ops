import React from 'react'
import styled from 'styled-components'

const LoadingState = ({}) => {
  return [1, 2, 3, 4, 5].map((i) => (
    <GroupRoot key={i}>
      <WhiteRectangle className="u-skeleton-box" />
      <WhiteRectangle1 className="u-skeleton-box" />
      <WhiteRectangle2 className="u-skeleton-box" />
      <WhiteFlexColumn>
        <Ellipse
          src={`https://file.rendit.io/n/EupzcIYgr2QXM2DKG9pX.svg`}
          className="u-skeleton-box"
        />
      </WhiteFlexColumn>
      <WhiteFlexColumn1>
        <Polygon src={`https://file.rendit.io/n/2g8Lj4bCmq3R0yfSUpDk.svg`} />
      </WhiteFlexColumn1>
      <Image1 src={`https://file.rendit.io/n/CaurHyCAtVKTcxcfxeMb.svg`} />
      <Dinein src={`https://file.rendit.io/n/Qi7ZO6fNQNCoAtNBplZa.svg`} />
      <WhiteRectangle3 />
      <Element1>
        <WhiteRectangle4 />
        <WhiteRectangle5 />
      </Element1>
    </GroupRoot>
  ))
}
const GroupRoot = styled.div`
  height: 17px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`
const WhiteRectangle = styled.div`
  width: 250px;
  height: 14px;
  background-color: #e6e6e6;
  align-self: flex-start;
  border-radius: 20px;
  margin-left: 15px;
  margin-right: 40px;
`
const WhiteRectangle1 = styled.div`
  width: 70px;
  height: 14px;
  background-color: #e6e6e6;
  align-self: flex-start;
  border-radius: 20px;
  margin-right: 60px;
`
const WhiteRectangle2 = styled.div`
  width: 55px;
  height: 14px;
  background-color: #e6e6e6;
  align-self: flex-start;
  border-radius: 20px;
  margin-right: 35px;
`
const WhiteFlexColumn = styled.div`
  border-color: #e6e6e6;
  border-style: solid;
  height: 12px;
  background-color: #e6e6e6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 3px;
  margin: 0px 5px 1px 0px;
  border-width: 1px;
`
const Ellipse = styled.img`
  width: 6px;
  height: 6px;
`
const WhiteFlexColumn1 = styled.div`
  border-color: #e6e6e6;
  border-style: solid;
  background-color: #e6e6e6;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2px 1.67px 2.5px 1.67px;
  margin: 0px 73px 1px 0px;
  border-width: 1px;
`
const Polygon = styled.img`
  width: 8.66px;
  height: 7.5px;
`
const Image1 = styled.img`
  width: 16px;
  height: 16px;
  margin: 0px 10px 0px 0px;
`
const Dinein = styled.img`
  width: 18px;
  height: 16px;
  margin: 0px 75px 0px 0px;
`
const WhiteRectangle3 = styled.div`
  width: 29px;
  height: 12.25px;
  background-color: #e6e6e6;
  align-self: flex-start;
  border-radius: 20px;
  margin: 1px 11px 0px 0px;
`
const Element1 = styled.div`
  width: 60px;
  height: 3px;
  position: relative;
  margin: 0px 0px 6px 0px;
`
const WhiteRectangle4 = styled.div`
  border-color: #e6e6e6;
  border-style: solid;
  width: 58px;
  height: 1px;
  background-color: #e6e6e6;
  opacity: 0.1;
  position: absolute;
  border-radius: 4px;
  border-width: 1px;
`
const WhiteRectangle5 = styled.div`
  border-color: #e6e6e6;
  border-style: solid;
  width: 42px;
  height: 1px;
  background-color: #e6e6e6;
  position: absolute;
  border-radius: 4px;
  border-width: 1px;
`

export default LoadingState
