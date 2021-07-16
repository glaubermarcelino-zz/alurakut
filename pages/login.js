import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import nookies from 'nookies';

// import LoginGithub from '../node_modules/react-login-github/dist';

export default function LoginScreen() {
  const [userGithub, setUserGitHub] = useState('');
  const router = useRouter();

  const handleLoginGitHub = (event) => {
    event.preventDefault();
    axios.post('https://alurakut.vercel.app/api/login',JSON.stringify({githubUser:userGithub}),{
      headers:{
        "Content-Type'":"application/json",
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Headers":"*"
      }
    }).then(async (respostaDoServer) =>{
      const dadosDaResposta = await respostaDoServer.json()
      const token = dadosDaResposta.token;
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
    


  }
  const onSuccess = (data) => {
    console.log(data);
  }
  const onFailure = (data) =>{
    console.log(data);
  }
  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
{/* <LoginGithub clientId="0b801adee1878597dfbd"
    onSuccess={onSuccess}
    onFailure={onFailure}/> */}

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
            <button onClick={(e) => handleLoginGitHub(e)}>
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