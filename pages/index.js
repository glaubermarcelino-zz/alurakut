import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import nookies from 'nookies';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

import Box from '../src/components/Box/Box';
import BoxGroup from '../src/components/BoxGroup';
import MainGrid from '../src/components/MainGrid/MainGrid';
import ProfileSideBar from '../src/components/ProfileSideBar'

import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { http } from '../src/services/http';


export default function Home(props) {
  const githubUser = props.githubUser;

  const [seguidores, setSeguidores] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [comunidades, setComunidades] = useState([]);
  const [title, setTitle] = useState('')
  const [urlImage, setUrlImage] = useState('')
  const [urlComunidade, setUrlComunidade] = useState('')

  const pessoalFavoritas = [{ id: 1, nome: "juunegreiros", avatar: `${process.env.NEXT_PUBLIC_GITHUB}/juunegreiros.png` },
  { id: 2, nome: "omariosouto", avatar: `${process.env.NEXT_PUBLIC_GITHUB}/omariosouto.png` },
  { id: 3, nome: "rafaballerini", avatar: `${process.env.NEXT_PUBLIC_GITHUB}/rafaballerini.png` },
  { id: 4, nome: "marcobrunodev", avatar: `${process.env.NEXT_PUBLIC_GITHUB}/marcobrunodev.png` },
    { id: 5, nome: "felipefialho", avatar: `${process.env.NEXT_PUBLIC_GITHUB}/felipefialho.png` }];
  
  const itemsPorPagina = 29;

  useEffect(() => {

    const remapSeguidor = [];
    http.get(`/${githubUser}/followers?per_page=${itemsPorPagina}&page=${currentPage}&order=DESC`)
      .then((response) => {
        if (response.data) {
          const dados = response.data;
          console.log(seguidores);
          dados.map(({ id, login, avatar_url }) => {
            remapSeguidor.push({
              id: id,
              nome: login,
              avatar: avatar_url
            });

          })
        }
        setSeguidores((prevFollowers) => [...prevFollowers, ...remapSeguidor]);
      }).catch(() => toast.info(`Não foi possível carregar os seguidores`))
    handleObterComunidades();
  }, [currentPage]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setCurrentPage((currentStateInsideState) => currentStateInsideState + 1);
      }
    });
    intersectionObserver.observe(document.querySelector('#sentinela'));
    return () => intersectionObserver.disconnect();
  }, [])

  const handleCriarComunidade = async (event) => {
    event.preventDefault();
    const dados = {
      title: title,
      url_comunidade: urlComunidade,
      image_url: urlImage,
      sluguser: githubUser
    }
    await fetch('/api/comunidades', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    }).then(async (response) => {
      const dadosretornados = await response.json();
      const { createdAt, id, imageUrl, title, urlComunidade } = dadosretornados.registroCriado;

      toast.success("Comunidade inserida com sucesso!")
      const retorno = {
        data: createdAt,
        id: id,
        avatar: imageUrl,
        nome: title,
        urlComunidade: urlComunidade,
        githubUser: sluguser
      }
      setComunidades([...comunidades, retorno])
    })
      .catch(erro => toast.error(`Ocorreu um erro ao cadastrar a comunidade ${erro}`))
    setTitle('');
    setUrlImage('');
    setUrlComunidade('');

  }

  async function handleObterComunidades() {
    const filter = JSON.stringify({
      query: `query{
        allCommunities(filter: {sluguser: {eq: "${githubUser}"}}) {
        id
        imageUrl
        title
        urlComunidade
        updatedAt
        sluguser
      }
    }
    `})

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN_DATOCMS_READONLY}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: filter
    }).then((data) => data.json())
      .then((response) => {
        const remap = [];
        response.data.allCommunities.map((item) => {
          remap.push({
            data: item.updatedAt,
            id: item.id,
            avatar: item.imageUrl,
            nome: item.title,
            urlComunidade: item.urlComunidade,
            tipo: 'comunidades'
          });
        })
        setComunidades(remap)
      });
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <ToastContainer
          position="top-right"
          autoClose="5000"
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          progress={undefined}
        />
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
                  onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div>
                <input
                  placeholder="Coloque uma url para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma url para usarmos de capa"
                  type="text"
                  value={urlImage}
                  onChange={(e) => setUrlImage(e.target.value)} />
                <input
                  placeholder="Link para a comunidade"
                  name="linkComunidade"
                  aria-label="Link para a comunidade"
                  type="text"
                  value={urlComunidade}
                  onChange={(e) => setUrlComunidade(e.target.value)} />
              </div>
              <button onClick={(e) => handleCriarComunidade(e)}>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          {seguidores && (<BoxGroup data={seguidores} title="Seguidores" tipo="seguidores" Pagina={currentPage} />)}
          {pessoalFavoritas && <BoxGroup data={pessoalFavoritas} title="Pessoas da Comunidade" tipo="pessoalcomunidade" />}
          {comunidades && <BoxGroup data={comunidades} title="Comunidades" tipo="comunidades" />}
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;


  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      "Authorization": token
    }
  }).then((response) => response.json())

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }
  }
}