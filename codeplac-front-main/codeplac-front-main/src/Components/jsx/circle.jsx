import React from "react";
import "../css/circle.css";

const Circle = ({ 
  size = 360, 
  variant = "cyan", 
  className = "" 
}) => {
  
  // Estilo inline dinâmico para garantir o formato circular perfeito
  const circleStyle = {
    width: `${size}px`,
    height: `${size}px`,
    flexShrink: 0 // Impede que o círculo achate em layouts flexbox desktop
  };

  return (
    <div
      className={`glow-ring ${variant} ${className}`}
      style={circleStyle}
    />
  );
};

export default Circle;