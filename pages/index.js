import { Container, MainGrid } from '../src/components/MainGrid'
import { Box } from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper, ProfileRelationsBox } from '../src/components/ProfileRelations'
import React, { useEffect, useState } from 'react'
import { ProfilesideBar } from '../src/components/ProfilesideBar'

export default function Home() {
  const user = "fcventura02";
  const peopleFavorites = [
    'Juunegreiros', 'peas', 'omariosouto',
    'rafaballerini', 'marcobrunodev'
  ]
  const [communities, setCommunities] = useState([
    {
      name: 'Juras',
      imgUrl: "https://picsum.photos/200/300"
    }])
  const [followers, setFollowers] = useState([])

  useEffect(() => {
    console.log("as")
    fetch('https://api.github.com/users/fcventura02/followers')
      .then((response) => {
        return response.json()
      })
      .then((resp) =>{
        setFollowers([...followers, ...resp])
      })
    .catch((err) => console.log(err))
}, [])

return (
  <>
    <AlurakutMenu githubUser={user} />
    <MainGrid>
      <Container as="nav" className="profileArea" style={{ gridArea: "profileArea" }}>
        <ProfilesideBar gitUser={user} />
      </Container>
      <Container as="section" className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
        <Box >
          <h1 className="title">
            Bem vindo!
          </h1>
          <OrkutNostalgicIconSet />
        </Box>
        <Box>
          <h2 className="subTitle">
            O que voce deseja fazer ?
          </h2>
          <form onSubmit={function handleChange(e) {
            const formDatas = new FormData(e.target);
            const name = formDatas.get("title")
            const imgUrl = formDatas.get("image")
            if (!!name && !!imgUrl)
              setCommunities([...communities,
              { name, imgUrl }
              ])
            e.preventDefault();
          }}>
            <div>
              <input
                placeholder="Qual vai ser o nome da sua comunidade?"
                name="title"
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
              />
            </div>
            <div>
              <input
                placeholder="Coloque uma URL para usarmos de capa."
                name="image"
                aria-label="Coloque uma URL para usarmos de capa."
                type="text"
              />
            </div>
            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
      </Container>
      <Container as="aside" className="profileRelationsArea" style={{ gridArea: "profileRelationsArea" }}>
        <ProfileRelationsBox title="Meus seguidores" items={followers} />

        <ProfileRelationsBoxWrapper >
          <h2 className="smallTitle">
            Meus amigos ({peopleFavorites.length})
          </h2>
          <ul>
            {
              peopleFavorites.map((peoplefavorite) => {
                return (
                  <li key={peoplefavorite}>
                    <a href={`/users/${peoplefavorite}`}>
                      <img src={`https://github.com/${peoplefavorite}.png`}
                      />
                      <span>{peoplefavorite}</span>
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper >
          <h2 className="smallTitle">
            Minhas comunidades ({communities.length})
          </h2>
          <ul>
            {
              communities.map((communit, i) => {
                return (
                  <li key={i}>
                    <a href={`/communit/${communit.name}`}>
                      <img src={communit.imgUrl}
                      />
                      <span>{communit.name}</span>
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </ProfileRelationsBoxWrapper>
      </Container>
    </MainGrid>
  </>
)
}
