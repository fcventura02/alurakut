import React, { useEffect, useState } from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'

import { Box } from '../src/components/Box'
import { Container, MainGrid } from '../src/components/MainGrid'
import { ProfilesideBar } from '../src/components/ProfilesideBar'
import { ProfileRelationsBoxWrapper, ProfileRelationsBox } from '../src/components/ProfileRelations'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import FormAddNewCommunit from '../src/components/FormAddNewCommunit';
import FormAddNewScrap from '../src/components/FormAddNewScrap';

export default function Home(props) {
  const user = props.githubUser;
  const peopleFavorites = [
    'Juunegreiros', 'peas', 'omariosouto',
    'rafaballerini', 'marcobrunodev'
  ]
  const [communities, setCommunities] = useState([])
  const [scraps, setScraps] = useState([])
  const [followers, setFollowers] = useState([])
  const [toogle, setToogle] = useState(true)

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
    apiDatoPost()
  }, [])

  function handleChangeCommunits(arr) {
    setCommunities([...communities, arr])
  }
  function handleChangeScraps(arr) {
    setScraps([...scraps, arr])
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
            <div className="containButton">
              <button className={toogle ? "isSelect": ""} onClick={() => setToogle(true)}>Criar comunidade</button>
              <button className={!toogle ? "isSelect": ""} onClick={() => setToogle(false)}>Deixar um scrap</button>
            </div>
            <div style={{ display: toogle && "none" }}>
              <FormAddNewCommunit githubUser={user} fn={handleChangeCommunits} />
            </div>
            <div style={{ display: !toogle && "none" }}>
              <FormAddNewScrap githubUser={user} fn={handleChangeScraps} />
            </div>
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

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
    .then((resposta) => resposta.json())
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  const { githubUser } = jwt.decode(token)
  return {
    props: {
      githubUser
    }
  }
}