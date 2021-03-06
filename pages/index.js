import React, { useEffect, useState } from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import { format } from 'date-fns'

import { Box } from '../src/components/Box'
import { Container, MainGrid } from '../src/components/MainGrid'
import { ProfilesideBar } from '../src/components/ProfilesideBar'
import { ProfileRelationsBoxWrapper, ProfileRelationsBox } from '../src/components/ProfileRelations'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import FormAddNewCommunit from '../src/components/FormAddNewCommunit';
import FormAddNewScrap from '../src/components/FormAddNewScrap';
import Link from 'next/link'

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
  function apiDatoPostScraps() {
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '90efc1f09ee724709d4d79ec37063c',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query: `query{
          allScraps {
            id,
            createdAt,
            description,
            creatorslug
          }
        }`
      }),
    })
      .then((response) => response.json())
      .then((resp) => setScraps([...resp.data.allScraps]))
      .catch((err) => console.log({ dato: err }))
  }

  useEffect(() => {
    apiGitHubGetFollowers()
    apiDatoPost()
    apiDatoPostScraps()
  }, [])

  function handleChangeCommunits(arr) {
    setCommunities([arr, ...communities])
  }
  function handleChangeScraps(arr) {
    setScraps([arr, ...scraps])
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
              <button
                className={toogle ? "isSelect" : " "}
                onClick={() => setToogle(true)}>
                Criar comunidade
              </button>
              <button
                className={!toogle ? "isSelect" : " "}
                onClick={() => setToogle(false)}>
                Criar scrap
              </button>
            </div>
            <div style={{ display: !toogle ? "none" : "block" }}>
              <FormAddNewCommunit githubUser={user} fn={handleChangeCommunits} />
            </div>
            <div style={{ display: !!toogle ? "none" : "block" }}>
              <FormAddNewScrap githubUser={user} fn={handleChangeScraps} />
            </div>
          </Box>
          <Box >
            <h2 className="subTitle">
              Recados
            </h2>
            <div className="scrapsContainner">
              {
                scraps.map(item => {
                  return (
                    <div key={item.id} className="scrapsContain">
                      <div>
                        <img src={`https://github.com/${item.creatorslug}.png`} />
                        <a href={`https://github.com/${item.creatorslug}`} target="_blank"><span>@{item.creatorslug}</span></a>
                        <span>{format(new Date(item.createdAt), 'dd-MM-yyyy')}</span>
                      </div>
                      <p>{item.description}</p>
                    </div>
                  )
                })
              }
            </div>
          </Box>
        </Container>
        <Container as="aside" className="profileRelationsArea" style={{ gridArea: "profileRelationsArea" }}>
          <ProfileRelationsBox title="Meus seguidores" items={followers} />
          <ProfileRelationsBoxWrapper >
            <Link href="/users">
              <h2 className="smallTitle">
                Meus amigos ({peopleFavorites.length})
              </h2>
            </Link>
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
            <Link href="/communits">
              <h2 className="smallTitle">
                Minhas comunidades ({communities.length})
              </h2>
            </Link>
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