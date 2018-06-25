import React, { Component } from "react";
import EntryCard from "./entry-card"
import BalanceCard from "./balance-card"

class Cards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <EntryCard />
        <BalanceCard balance={this.props.balance} />
      </div>
    );
  }
}

export default Cards;