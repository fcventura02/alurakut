import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import { Container, MainGrid } from "../../src/components/MainGrid";
import { AlurakutMenu } from "../../src/lib/AlurakutCommons";
import { useEffect, useState } from 'react';
import { Box } from '../../src/components/Box';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link'

export default function communitsPage(props) {
  const user = props.githubUser;
  const [communit, setCommunit] = useState({})
  const router = useRouter();
  const communitId = router.query.id;
  console.log(router)

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
          community(filter: {id: {in: ${communitId}}}){
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
        return setCommunit(resp.data.community)
      })
      .catch((err) => console.log({ dato: err }))
  }

  useEffect(() => {
    apiDatoPost()
  }, [])
  return (
    <>
      <AlurakutMenu githubUser={user} />
      <MainGrid style={{ gridTemplateAreas: '"profileArea welcomeArea welcomeArea"' }}>
        <Container as="nav" className="profileArea" style={{ gridArea: "profileArea" }}>
          <Box>
            <img src={communit.imageurl}
              style={{ borderRadius: "8px" }}
            />
            <hr />
            <div>
              <p className="boxLink">{communit.title}</p>
              <span style={{ fontSize: "0.85rem", color: "var(--textTertiaryColor)" }}>15 membros</span>
            </div>
            <hr />
          </Box>
        </Container>
        <Container as="aside" className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h2>
              {communit.title}
            </h2>
            <span className="boxMenuPath">
              {[{ name: 'Inicio', slug: '/' }, { name: 'Minhas comunidades', slug: '/communits' }].map((menuItem) => (
                <Link key={`key__${menuItem.name}`} href={`${menuItem.slug.toLocaleLowerCase()}`}>
                  <a> {menuItem.name} </a>
                </Link>
              ))}
            </span>
            <div className="infoCommunit">
              <p>
                dono:{` ${communit.creatorSlug ? communit.creatorSlug : "Anônimo"}`}
              </p>
              <p>
                Descrição:{` ${communit.description ? communit.description : "Sem descrição"}`}
              </p>
            </div>
          </Box>
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