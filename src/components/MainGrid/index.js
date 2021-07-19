import styled from 'styled-components'

export const MainGrid = styled.main`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  grid-gap: 1rem;
  padding: 1.4rem 1.6rem;
  .profileArea{
    display: none;
    @media(min-width: 860px){
      display: block;
    }
  }

  @media(min-width: 860px){
    max-width: 1100px;
    display: grid;
    grid-template-areas: "profileArea welcomeArea profileRelationsArea";
    grid-template-columns: 160px 1fr 312px;
  }
`

export const Container = styled.div`
  margin-bottom: 10px;
.boxMenuPath{
	a {
			font-size: 12px;
        color: var(--textTertiaryColor);
        padding: 10px 15px;
				padding-right: 5px;
        position: relative;
        text-decoration: none;
				
			&:after {
          content: ">";
          display: block;
          position: absolute;
          height: 15px;
          margin: auto;
          left: 0;
          top: 0;
          bottom: 0;
			}
			&:first-child{
				padding-left: 0;
					&:after {
          display: none;
				}
			}
	}
}
`