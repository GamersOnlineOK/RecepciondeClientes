import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {  NavLink } from 'react-router-dom';

function Menu(props) {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink to="/">

          <img height="auto" width="180px" />
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              
              <NavLink activeClassName="text-dark" className="nav-link"  to="/">Inicio</NavLink>
              <NavLink  className="nav-link"  to="/clientes">Clientes</NavLink>
              <NavLink className="nav-link" to="/adminPanel" >AdminPanel</NavLink>
              
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
