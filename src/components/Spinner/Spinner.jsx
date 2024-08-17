import React from 'react';
import netflix_spinner from '../../assets/netflix_spinner.gif';
import './Spinner.css'; 

const Spinner = () => {
  return (
    <div className="login-spinner"> 
        <img src={netflix_spinner} 
             alt="loading" /> 
    </div> 
  );
};

export default Spinner;