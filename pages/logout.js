import nookies from 'nookies';
import { useRouter } from 'next/router';
import { ToastContainer,toast } from 'react-toastify';
import React, { useEffect } from 'react';

export default function logout() {
  const router = useRouter();
  useEffect(() => {
    nookies.destroy(null,'USER',{path:'/'});
    nookies.destroy(null,'USER_TOKEN',{path:'/'});

    toast.success("Logout efetuado com sucesso!");

    setTimeout(() =>{
      router.push('/login');
    },3000)
  }, [])
  return <> <ToastContainer
  position="top-right"
  autoClose="2500"
  hideProgressBar={false}
  closeOnClick={true}
  pauseOnHover={true}
  draggable={true}
  progress={undefined}
/></>


}