import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMonthTimesheets } from "../actions";

class TimesheetIndex extends Component {
  componentDidMount() {
    this.props.fetchMonthTimesheets();
  }

  renderTimesheets() {
    return _.map(this.props.timesheets, ts => {
      return (
        <tr key={ts.id}>
          <td>
            {ts.workday}
          </td>
          <td>
            {ts.entry_1}
          </td>
          <td>
            {ts.entry_2}
          </td>
          <td>
            {ts.entry_3}
          </td>
          <td>
            {ts.entry_4}
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Timesheets</h3>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>
                Dia
              </th>
              <th>
                1ª Entrada
              </th>
              <th>
                1ª Saída
              </th>
              <th>
                2ª Entrada
              </th>
              <th>
                2ª Saída
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderTimesheets()}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { timesheets: state.timesheets };
}

export default connect(mapStateToProps, { fetchMonthTimesheets })(TimesheetIndex);
