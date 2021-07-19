import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import { Container, MainGrid } from "../src/components/MainGrid";
import { ProfilesideBar } from "../src/components/ProfilesideBar";
import { AlurakutMenu } from "../src/lib/AlurakutCommons";
import { useEffect, useState } from 'react';
import { ListCommunits } from '../src/components/ListCommunits';
import { Box } from '../src/components/Box';
import FormAddNewCommunit from '../src/components/FormAddNewCommunit';
import Link from 'next/link';

export default function communitsPage(props) {
  const user = props.githubUser;
  const [communities, setCommunities] = useState([])
  const [contador, setContador] = useState(0)
  const [limitPage, setLimitPage] = useState(6)
  const [toogle, setToogle] = useState(false)

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
      .then((resp) => {
        return setCommunities([...resp.data.allCommunities])
      })
      .catch((err) => console.log({ dato: err }))
  }

  useEffect(() => {
    apiDatoPost()
  }, [])

  function handleChangeCommunits(arr) {
    setCommunities([...communities, arr])
    setToogle(!toogle)
  }
  function backPage() {
    const calcCount = contador - 6
    const calcLimit = limitPage === communities.length ? communities.length - (communities.length - contador) : limitPage - 6
    setContador(calcCount < 0 ? 0 : calcCount)
    setLimitPage(calcLimit < 6 ? 6 : calcLimit)
  }
  function nextPage() {
    const calcLimit = limitPage + 6
    setContador(limitPage)
    setLimitPage(calcLimit > communities.length ? communities.length : calcLimit)
  }
  return (
    <>
      <AlurakutMenu githubUser={user} />
      <MainGrid style={{ gridTemplateAreas: '"profileArea welcomeArea welcomeArea"' }}>
        <Container as="nav" className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfilesideBar gitUser={user} />
        </Container>
        <Container as="aside" className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <ListCommunits>
            <Container>
              <h2>
                Minhas comunidades
              </h2>
              <span className="boxMenuPath">
              {[{ name: 'Inicio', slug: '/' }, { name: 'Minhas comunidades', slug: '/communits' }].map((menuItem) => (
                <Link key={`key__${menuItem.name}`} href={`${menuItem.slug.toLocaleLowerCase()}`}>
                  <a> {menuItem.name} </a>
                </Link>
              ))}
            </span>
            </Container>
            <button className="btn-novaComunidade" onClick={() => setToogle(!toogle)}>
              Nova comunidade
            </button>
            <Box style={{ display: toogle ? "block" : "none" }}>
              <FormAddNewCommunit githubUser={user} fn={handleChangeCommunits} />
            </Box>
            <Container className="container_page">
              <p className="contador">
                mostrando <sapn>{contador + 1}-{limitPage}</sapn> de <sapn>{communities.length}</sapn>
              </p>
              <div>
                <button onClick={() => backPage()} disabled={contador === 0 && true}>
                  anterior
                </button>
                <button onClick={() => nextPage()} disabled={!(limitPage < communities.length) && true}>
                  proxíma
                </button>
              </div>
            </Container>
            <ul>
              {
                communities.slice(contador, limitPage).map((item) => {
                  return (
                    <li key={item.id}>
                      <Link href={`/communits/${item.id}`}>
                        <a >
                          <img src={item.imageurl}
                          />
                          <div>
                            <p>{item.title}</p>
                            <span>15 membros</span>
                          </div>
                        </a>
                      </Link>
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