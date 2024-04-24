import React from 'react';

const Button = ({ onClick, name }) => {
  return (
    <div className="dhx_sample-controls">
      <button className="dhx_sample-btn dhx_sample-btn--flat" onClick={onClick}>
        {name}
      </button>
    </div>
  );
};

export default Button;
