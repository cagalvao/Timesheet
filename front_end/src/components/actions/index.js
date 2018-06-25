import React, { Component } from "react";

class Actions extends Component {
  render() {
    return (
      <section id="actions" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <a href="#" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addPostModal">
                <i className="fas fa-plus"></i> Linha do Tempo
              </a>
            </div>
            <div className="col-md-3">
              <a href="#" className="btn btn-success btn-block" data-toggle="modal" data-target="#addCategoryModal">
                <i className="fas fa-plus"></i> Jornada
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Actions;