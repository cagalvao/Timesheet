import React, { Component } from "react";

class BalanceCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let background = "card text-center text-white p-3 mb-3"
    background += this.props.balance && this.props.balance.includes('-') ? " bg-danger" : " bg-success"

    return (
      <div className={background}>
        <div className="row">
          <div className="col-3 pl-3">
            <h4 className="display-4">
              <i className="far fa-clock align-middle"></i>
            </h4>
          </div>
          <div className="col-9 px-0">
            <span className="text-center d-block" style={{ fontSize: '12px' }}>SALDO ATUAL</span>
            <span className="d-block" style={{ fontSize: '40px' }}>{this.props.balance}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default BalanceCard;