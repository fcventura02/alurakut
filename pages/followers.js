import React, { useEffect, useState } from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'

import { Container, MainGrid } from '../src/components/MainGrid'
import { ProfilesideBar } from '../src/components/ProfilesideBar'
import { AlurakutMenu } from '../src/lib/AlurakutCommons'
import { ListCommunits } from '../src/components/ListCommunits'
import Link from 'next/link'


export default function Followers(props) {
  const user = props.githubUser;
  const [followers, setFollowers] = useState([])

  async function apiGitHubGetFollowers() {
    const data = await fetch('https://api.github.com/users/fcventura02/followers')
      .then((response) => response.json())
      .catch((err) => console.log({ followers: err }))
    const arr = []
    for (const item of data) {
      arr.push(await fetch(`https://api.github.com/users/${item.login}`)
        .then((response) => response.json())
      )
    }
    setFollowers([...arr])
  }

  useEffect(() => {
    apiGitHubGetFollowers()
  }, [])

  return (
    <>
      <AlurakutMenu githubUser={user} />
      <MainGrid style={{ gridTemplateAreas: '"profileArea welcomeArea welcomeArea"' }}>
        <Container as="nav" className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfilesideBar gitUser={user} />
        </Container>
        <Container as="section" className="welcomeArea" style={{ gridArea: "welcomeArea", gridTemplateAreas: '"profileArea welcomeArea welcomeArea"' }}>
          <ListCommunits>
            <Container>
              <h2>
                Meus seguidores
              </h2>
              <span className="boxMenuPath">
                {[{ name: 'Inicio', slug: '/' }, { name: 'Meus seguidores', slug: '/followers' }].map((menuItem) => (
                  <Link key={`key__${menuItem.name}`} href={`${menuItem.slug.toLocaleLowerCase()}`}>
                    <a> {menuItem.name} </a>
                  </Link>
                ))}
              </span>
            </Container>
            <ul>
              {
                !!followers && followers.map((item) => {
                  return (
                    <li key={item.id}>
                      <a href={item.html_url} target="__blank">
                        <img src={`https://github.com/${item.login}.png`}
                        />
                        <div>
                          <p>{item.name}</p>
                          <span>{item.location}</span><br />
                          <span>{item.bio}</span>
                        </div>
                      </a>
                    </li>
                  )
                })
              }
            </ul>
          </ListCommunits>
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