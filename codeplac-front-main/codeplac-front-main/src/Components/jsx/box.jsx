import React from 'react';

// Estilos e Assets
import "../css/box.css";
import backgroundGif from '../../assets/img/Background.gif';

const Box = ({ children, className = "" }) => {
  const sectionStyle = {
    backgroundImage: `url(${backgroundGif})`,
  };

  return (
    <div className={`hero-container ${className}`} style={sectionStyle}>
      <div className="hero-content">
        {children}
      </div>
    </div>
  );
};

export default Box;