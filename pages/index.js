import Box from '../src/components/Box/Box';
import MainGrid from '../src/components/MainGrid/MainGrid';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

const ProfileSideBar = (user) => {
  return (
    <Box>
      <img src={`https://www.github.com/${user.githubUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  );
}
export default function Home() {

  const githubUser = 'glaubermarcelino';
  const pessoalFavoritas = ["juunegreiros", "omariosouto", "rafaballerini", "marcobrunodev", "felipefialho"];

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem Vindo(a)</h1>
            <OrkutNostalgicIconSet/>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoalFavoritas.length})

            </h2>
            <ul>
              {pessoalFavoritas.map((pessoaFavorita) => {
                return (<li key={pessoaFavorita}>
                  <a href={`/users/${pessoaFavorita}`}>
                    <img src={`https://www.github.com/${pessoaFavorita}.png`} />
                    <span>{pessoaFavorita}</span>
                  </a>
                </li>)
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>Comunidades</Box>
        </div>
      </MainGrid>
    </>
  )
}
