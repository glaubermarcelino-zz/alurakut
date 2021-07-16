import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import nookies from 'nookies';
import { ToastContainer, toast } from 'react-toastify';

export default function LoginScreen() {
  const [userGithub, setUserGitHub] = useState('');
  const [usuarioExiste, setUsuarioExiste] = useState(false);
  const router = useRouter();


  const handleUsuarioGithubExiste = (usuario) => {
    axios.get(`${process.env.NEXT_PUBLIC_GITHUB_API}/users/${usuario}`)
    .then((response) =>{
        if(response.status == 200){
          setUsuarioExiste(true);
        }
    }).catch(erro => setUsuarioExiste(false))
   return usuarioExiste;
  }
  const handleLoginGitHub = (event) => {
    event.preventDefault();
    if (handleUsuarioGithubExiste(userGithub)) {
      const user = JSON.stringify({ githubUser: userGithub });

      axios.post('https://alurakut.vercel.app/api/login', user)
        .then(respostaDoServer => {
          const dadosDaResposta = respostaDoServer;
          const token = dadosDaResposta.data.token;
          nookies.set(null, 'USER_TOKEN', token, {
            path: '/',
            maxAge: 86400 * 7
          })
          nookies.set(null, 'USER', userGithub, {
            path: '/',
            maxAge: 86400 * 7
          })
          router.push('/')
        }).catch(erro => console.log(erro)
        )
    } else {
      toast.error(`Usuário inválido!`);
    }
  }
  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <ToastContainer
          position="top-right"
          autoClose="5000"
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          progress={undefined}
        />
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
          <form className="box">
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <input placeholder="Usuário" value={userGithub} onChange={(e) => setUserGitHub(e.target.value)} />
            <button onClick={(e) => handleLoginGitHub(e)} disabled={!userGithub.length > 0}>
              Login
            </button>

          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>
                  ENTRAR JÁ
                </strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
}