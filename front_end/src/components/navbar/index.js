import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
          <div className="container">
            <a href="index.html" className="navbar-brand">Timesheet</a>
            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown mr-3">
                  <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                    <i className="fas fa-user"></i> Bem-Vindo, Cássio!
                  </a>
                  <div className="dropdown-menu">
                    <a href="profile.html" className="dropdown-item">
                      <i className="fas fa-user-circle"></i> Meu Perfil
                    </a>
                    <a href="settings.html" className="dropdown-item">
                      <i className="fas fa-cog"></i> Configurações
                    </a>
                  </div>
                </li>
                <li className="nav-item">
                  <a href="login.html" className="nav-link">
                    <i className="fas fa-user-times"></i> Sair
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;