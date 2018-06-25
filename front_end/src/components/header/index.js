import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <header id="main-header" className="py-2 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-cog"></i> Dashboard</h1>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;