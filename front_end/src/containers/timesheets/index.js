import _ from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import Cards from "../../components/cards"

import "./styles.scss"

import { fetchMonthTimesheets, addTimesheetEntry } from "../../actions";

class Timesheets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTimesheet: {}
    };

    this.addTimesheetEntry = this.addTimesheetEntry.bind(this);
  }

  componentDidMount() {
    this.props.fetchMonthTimesheets();
  }

  addTimesheetEntry() {
    this.props.addTimesheetEntry(() => {
      this.props.fetchMonthTimesheets();
    });
  }

  getBalance() {
    if (this.props.timesheets.length > 0) {
      let i
      for (i = 0; i < this.props.timesheets.length; i++) {
        if (this.props.timesheets[i].accDiff) {
          break
        }
      }
      return this.props.timesheets[i].accDiff
    }
  }

  renderTimesheetsBody() {
    return _.map(this.props.timesheets, ts => {
      return (
        <tr key={ts.id}>
          <td>{ts.workday}</td>
          <td>{ts.entry_1}</td>
          <td className="d-none d-lg-table-cell">{ts.entry_2}</td>
          <td className="d-none d-lg-table-cell">{ts.entry_3}</td>
          <td>{ts.entry_4}</td>
          <td>{ts.diff}</td>
          <td className="d-none d-lg-table-cell">{ts.accDiff}</td>
          <td>{this.renderButtons(ts)}</td>
        </tr>
      )
    });
  }

  renderButtons(ts) {
    return (
      <a href="" className="btn btn-secondary">
        <i className="fas fa-angle-double-right"></i>
        &nbsp;Detalhes
      </a>
    )
  }

  renderTimesheetsHeader() {
    return (
      <tr>
        <th>Dia</th>
        <th>1ª Entrada</th>
        <th className="d-none d-lg-table-cell">1ª Saída</th>
        <th className="d-none d-lg-table-cell">2ª Entrada</th>
        <th>2ª Saída</th>
        <th>Total</th>
        <th className="d-none d-lg-table-cell">Saldo</th>
        <th></th>
      </tr>
    )
  }

  renderTimesheetsTable() {
    return (
      <table className="table table-striped break">
        <thead className="thead-dark">
          {this.renderTimesheetsHeader()}
        </thead>
        <tbody>
          {this.renderTimesheetsBody()}
        </tbody>
      </table>
    )
  }

  render() {
    return (
      <section id="posts">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="card">
                <div className="card-header">
                  <h4>Meu Ponto</h4>
                </div>
                <div className="card-body">
                  {this.renderTimesheetsTable()}
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <Cards balance={this.getBalance()} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Timesheets.propTypes = {
  timesheets: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchMonthTimesheets: PropTypes.func.isRequired,
  addTimesheetEntry: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  timesheets: state.timesheets
});

const mapDispatchToProps = {
  fetchMonthTimesheets,
  addTimesheetEntry
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timesheets);
