import React from "react"

import { Select, Input } from "./"
import { Conversion } from "../redux/convertion/types"

import { ContentContainer } from "../styles"

const Content: React.FC = () => {
  return (
    <ContentContainer>
      <Select name={Conversion.leftSelect} />
      <Input type="number" name={Conversion.leftInput} />
      <div>=</div>
      <Input type="number" name={Conversion.rightInput} />
      <Select name={Conversion.rightSelect} />
    </ContentContainer>
  )
}

export default Content