import { MainGrid } from '../src/components/MainGrid'
import { Box } from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfilesideBar(props) {

  return (
    <Box >
      <img src={`https://github.com/${props.imgUrl}.png`}
        style={{ borderRadius: "8px" }}
      />
    </Box>
  )
}

export default function Home() {
  const user = "fcventura02";
  const peopleFavorites = [
    'Juunegreiros', 'peas', 'omariosouto',
    'rafaballerini', 'marcobrunodev'
  ]


  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfilesideBar imgUrl={user} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box >
            <h1 className="title">
            Bem vindo!
            </h1>
            <OrkutNostalgicIconSet/>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: "profileRelationsArea" }}>
          <ProfileRelationsBoxWrapper >
            <h2 className="smallTitle">
              Pessoas da comunidade ({peopleFavorites.length})
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
        </div>
      </MainGrid>
    </>
  )
}
