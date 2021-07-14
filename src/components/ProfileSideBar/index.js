import Box from '../Box/Box';
import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons';

const ProfileSideBar = (user) => {
  return (
    <Box>
      <>
        <img src={`https://www.github.com/${user.githubUser}.png`} style={{ borderRadius: '8px' }} />

        <hr />
        <p>
          <a className="boxLink" href={`https://www.github.com/${user.githubUser}`}>
            @{user.githubUser}
          </a>
        </p>
        <hr />
        <AlurakutProfileSidebarMenuDefault />
      </>
    </Box>
  );
}

export default ProfileSideBar;