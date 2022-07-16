import styled from "styled-components"

const ContentContainer = styled.div`
  max-width: 1000px;
  margin: 10rem auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  div {
    font-size: 30px;
    font-weight: bold;
  }
  input {
    padding: 15px 25px;
    outline: none;
    border: 1px solid #f0f0f0;
    border-radius: 3px;
    font-size: 20px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  select {
    padding: 15px 25px;
    font-size: 20px;
    font-weight: bold;
  }
`

export default ContentContainer