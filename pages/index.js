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
  const [communities, setCommunities] = useState([])
  const [followers, setFollowers] = useState([])

  function apiGitHubGetFollowers() {
    fetch('https://api.github.com/users/fcventura02/followers')
      .then((response) => {
        return response.json()
      })
      .then((resp) => {
        setFollowers([...followers, ...resp])
      })
      .catch((err) => console.log({ followers: err }))
  }

  function apiDatoPost() {
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '90efc1f09ee724709d4d79ec37063c',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query: `query{
          allCommunities{
            id,
            title,
            imageurl,
            creatorSlug
          }
        }`
      }),
    })
      .then((response) => response.json())
      .then((resp) => setCommunities([...resp.data.allCommunities]))
      .catch((err) => console.log({ dato: err }))
  }

  useEffect(() => {
    apiGitHubGetFollowers()
    /* Api GraphQL */
    apiDatoPost()
  }, [])

  function handleChange(e) {
    e.preventDefault();
    const formDatas = new FormData(e.target);
    const comunidade = {
      title: formDatas.get("title"),
      imageurl: formDatas.get("image"),
      creatorSlug: user
    }
    if (!!comunidade.title && !!comunidade.imageurl)
      fetch('/api/comunidades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comunidade)
      })
        .then(async (resp) => {
          const dados = await resp.json();
          setCommunities([...communities, dados.registroCriado])
        })
  }

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
            <form onSubmit={(e)=>handleChange(e) }>
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
                communities.slice(0, 6).map((item) => {
                  return (
                    <li key={item.id}>
                      <a href={`/communits/${item.id}`}>
                        <img src={item.imageurl}
                        />
                        <span>{item.title}</span>
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
