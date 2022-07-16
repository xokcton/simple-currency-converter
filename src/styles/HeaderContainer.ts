import styled from "styled-components"

const HeaderContainer = styled.div`
  max-height: 100px;
  overflow: hidden;
  background-color: #f1f1f1;
  padding: 20px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  .wrapper {
    min-width: 1500px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      font-size: 30px;
      font-weight: bold;
    }
    .exchange-rate {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      min-width: 150px;
      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 20px;
        .to {
          margin: 0 10px; 
        }
      }
    }
  }
`

export default HeaderContainer