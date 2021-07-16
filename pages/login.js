import React, { useState } from 'react';
import { useRouter } from 'next/router';
// import LoginGithub from 'react-login-github';

export default function LoginScreen() {
  const [userGithub, setUserGitHub] = useState('');
  const router = useRouter();

  const handleLoginGitHub = (event) => {
    event.preventDefault();
    fetch('https://alurakut.vercel.app/api/login',{
      method:'POST',
      headers:{
        "Content-Type'":"application/json",
        "Access-Control-Allow-Origin":"*"
      },
      body:JSON.stringify({githubUser:userGithub})

    }).then(async (response) =>{
      const retorno = await response.json();
      console.log(retorno);
      // router.push('/');
    }).catch(erro => console.log(erro)
    )
    


  }
  const onSuccess = (data) => {
    console.log(data);
  }
  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>


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