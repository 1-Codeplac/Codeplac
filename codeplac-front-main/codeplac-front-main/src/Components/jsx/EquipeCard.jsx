import React from 'react';
import "../css/EquipeCard.css";

const EquipeCard = ({ foto, nome, funcao, linkCurriculo, corBorda }) => {
  // Define a variante de estilo com base na cor recebida
  const variantClass = corBorda === "#a45ee5" ? "purple" : "cyan";

  return (
    <div className={`profile-card ${variantClass}`}>
      <img 
        src={foto} 
        alt={`Foto de ${nome}`} 
        className="profile-image" 
      />
      
      <h3 className="profile-name">{nome}</h3>
      <p className="profile-role">{funcao}</p>
      
      <a 
        href={linkCurriculo} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="profile-link"
      >
        CURRÍCULO
      </a>
    </div>
  );
};

export default EquipeCard;