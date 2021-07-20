import React from 'react';

const Testimonial = ({ githubUser, recados }) => {
  return (
    <>
      <h2 className="subTitle">Depoimentos de {githubUser}</h2>
      <ul>
        {
          recados && recados.slice(0, 6).map((recado, index) => (
            <li key={index}>
              <img src={`https://github.com/${recado.autor}.png`} alt={recado.autor} />
              <div>
                <div>
                  <span>{recado.autor}</span><small> - {recado.data}</small>
                </div>
                <p>{recado.texto}</p>
              </div>
            </li>
          ))
        }

      </ul>
      <a href="#" className="showAll">Ver todos</a>
    </>
  )
}

export default Testimonial;