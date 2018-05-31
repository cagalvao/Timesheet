import _ from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMonthTimesheets } from "../actions";

class TimesheetIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTimesheet: -1,
      isEditing: false
    };

    this.editTimesheet = this.editTimesheet.bind(this);
    this.saveTimesheet = this.saveTimesheet.bind(this);
    this.cancelEditing = this.cancelEditing.bind(this);
  }

  componentDidMount() {
    this.props.fetchMonthTimesheets();
  }

  editTimesheet(ts) {
    this.setState({
      isEditing: true,
      currentTimesheet: ts.id
    });
  }

  saveTimesheet(ts) {
    console.log(ts)
  }

  cancelEditing() {
    this.setState({
      isEditing: false,
      currentTimesheet: -1
    });
  }

  renderTimesheets() {
    return _.map(this.props.timesheets, ts => this.renderFields(ts));
  }

  renderButtons(ts) {
    if (this.state.isEditing && this.state.currentTimesheet === ts.id) {
      return (
        <div>
          <button className="btn btn-primary" onClick={this.saveTimesheet.bind(this, ts)}>Salvar</button>
          <button className="btn btn-primary" onClick={this.cancelEditing}>
            Cancelar
          </button>
        </div>
      );
    }
    return (
      <button
        className="btn btn-primary"
        onClick={this.editTimesheet.bind(this, ts)}
      >
        Editar
      </button>
    );
  }

  renderFields(ts) {
    if (this.state.isEditing && this.state.currentTimesheet === ts.id) {
      return this.renderInputFields(ts);
    }
    return this.renderTextFields(ts);
  }

  renderTextFields(ts) {
    return (
      <tr key={ts.id}>
        <td>{ts.workday}</td>
        <td>{ts.entry_1}</td>
        <td>{ts.entry_2}</td>
        <td>{ts.entry_3}</td>
        <td>{ts.entry_4}</td>
        <td>{this.renderButtons(ts)}</td>
      </tr>
    );
  }

  renderInputFields(ts) {
    return (
      <tr key={ts.id}>
        <td>
          <input type="text" defaultValue={ts.workday} />
        </td>
        <td>
          <input type="text" defaultValue={ts.entry_1} />
        </td>
        <td>
          <input type="text" defaultValue={ts.entry_2} />
        </td>
        <td>
          <input type="text" defaultValue={ts.entry_3} />
        </td>
        <td>
          <input type="text" defaultValue={ts.entry_4} value={ts.entry_4} />
        </td>
        <td>{this.renderButtons(ts)}</td>
      </tr>
    );
  }

  render() {
    return (
      <div>
        <h3>Timesheets</h3>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Dia</th>
              <th>1ª Entrada</th>
              <th>1ª Saída</th>
              <th>2ª Entrada</th>
              <th>2ª Saída</th>
              <th />
            </tr>
          </thead>
          <tbody>{this.renderTimesheets()}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { timesheets: state.timesheets };
}

export default connect(
  mapStateToProps,
  { fetchMonthTimesheets }
)(TimesheetIndex);

TimesheetIndex.defaultProps = {
  fetchMonthTimesheets: PropTypes.func,
  timesheets: PropTypes.array
};

TimesheetIndex.propTypes = {
  fetchMonthTimesheets: PropTypes.func,
  timesheets: PropTypes.array
};
