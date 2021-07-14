import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Box from '../src/components/Box/Box';
import MainGrid from '../src/components/MainGrid/MainGrid';
import ProfileSideBar from '../src/components/ProfileSideBar'

import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { http } from '../src/services/http';


export default function Home() {

  const githubUser = 'glaubermarcelino';
  const [seguidores, setSeguidores] = useState(null);
  const [title,setTitle] = useState('')
  const [urlImage,setUrlImage] = useState('')
  const pessoalFavoritas = ["juunegreiros", "omariosouto", "rafaballerini", "marcobrunodev", "felipefialho"];
  const comunidades = [
    { name: "CSharp", logo: "https://growiz.com.br/wp-content/uploads/2020/08/kisspng-c-programming-language-logo-microsoft-visual-stud-atlas-portfolio-5b899192d7c600.1628571115357423548838.png" },
    { name: "Postgres", logo: "https://www.cyclonis.com/images/2018/10/1_7AOhGDnRL2eyJMUidCHZEA-765x383.jpg" },
    { name: "Morre Praga", logo: "https://s2.glbimg.com/6C8iXLc146uY7UcX1kbDiprbD3k=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2021/5/v/YTfYLvSdm55eJTuZxCNg/memes-phoenix-force-mundial-free-fire-ffws-2021.jpeg" },
    { name: "Vercel", logo: "https://res.cloudinary.com/practicaldev/image/fetch/s--UajhAYy4--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/emsbo1jy8jh91vvohwrj.jpeg" },
    { name: "ReactJS", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" }
  ];
 

  useEffect(() => {
    const remapSeguidor=[];

    http.get(`/${githubUser}/followers`)
      .then((response) => {
        if (response.data) {
          const dados = response.data;
          dados.map(({id,login,avatar_url}) =>{
            remapSeguidor.push({
              id:id,
              nome:login,
              avatar:avatar_url
            });
              
          })
        }
        setSeguidores(remapSeguidor);
      })
  }, [])

  function handleCriarComunidade(event){

    console.log(title);
    console.log(urlImage);

    event.preventDefault();
    setSeguidores([...seguidores,{
      id:10,
      nome:title,
      avatar:urlImage
    }]);
    setTitle('');
    setUrlImage('');
    toast.success("Comunidade inserida com sucesso!",
    {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
  })
  }

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <ToastContainer/>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem Vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form>
              <div>
                <input 
                  placeholder="Qual vai ser o seu nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o seu nome da sua comunidade?"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}/>
              </div>
              <div>
                <input 
                  placeholder="Coloque uma url para usarmos de capa" 
                  name="image" 
                  aria-label="Coloque uma url para usarmos de capa"
                  type="text"
                  value={urlImage}
                  onChange={(e) => setUrlImage(e.target.value)}/>
              </div>
              <button onClick={(e) => handleCriarComunidade(e)}>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          {seguidores && <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Seguidores ({seguidores.length})
            </h2>
            <ul>
              {seguidores.map((item) => {
                return (<li key={item.id}>
                  <a href={`/users/${item.nome}`}>
                    <img src={item.avatar} />
                    <span>{item.nome}</span>
                  </a>
                </li>)
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          }
          <Box>
            <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Comunidade ({comunidades.length})

              </h2>
              <ul>
                {comunidades.map((comunidade) => {
                  return (<li key={comunidade.name}>
                    <a href={`/comunidades/${comunidade.name}`}>
                      <img src={comunidade.logo} />
                      <span>{comunidade.name}</span>
                    </a>
                  </li>)
                })}
              </ul>
            </ProfileRelationsBoxWrapper></Box>
        </div>
      </MainGrid>
    </>
  )
}
