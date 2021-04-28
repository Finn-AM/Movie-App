import React from 'react';
import './Parallax.css';
import bg from '../assets/bg.jpg';

function Parallax() {
  return (
    <div className="parallax" style={{ backgroundImage: `url(${bg})` }}></div>
  );
}

export default Parallax;
