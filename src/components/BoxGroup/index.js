import Box from '../Box/Box';
import { ProfileRelationsBoxWrapper } from '../ProfileRelations';

const BoxGroup = (props) => {
  return (
    <Box>
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          {`${props.title} (${props.data?.length>0 ? props.data.length : 0})`}
        </h2>
        <ul>
          {props.data?.length>0 && props.data.slice(0,6).map((item) => {
            return (<li key={item.id}>
              <a href={`/${props.tipo}/${item.nome}`}>
                <img src={item.avatar} />
                <span>{item.nome}</span>
              </a>
            </li>)
          })}
          <li id="sentinela"></li>
        </ul>
      </ProfileRelationsBoxWrapper>
    </Box>
  )
}

export default BoxGroup;