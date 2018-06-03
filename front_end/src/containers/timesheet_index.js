import _ from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  fetchMonthTimesheets,
  addTimesheetLine,
  createTimesheet,
  editTimesheet,
  deleteTimesheet,
  addTimesheetEntry
} from "../actions";

class TimesheetIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTimesheet: {},
      isEditing: false
    };

    this.createTimesheet = this.createTimesheet.bind(this);
    this.editTimesheet = this.editTimesheet.bind(this);
    this.saveTimesheet = this.saveTimesheet.bind(this);
    this.deleteTimesheet = this.deleteTimesheet.bind(this);
    this.cancelEditing = this.cancelEditing.bind(this);
    this.addTimesheetEntry = this.addTimesheetEntry.bind(this);

    this.updateField = this.updateField.bind(this);
  }

  componentDidMount() {
    this.props.fetchMonthTimesheets();
  }

  createTimesheet() {
    const ts = {
      id: -1,
      employeeId: 1,
      entry_1: null,
      entry_2: null,
      entry_3: null,
      entry_4: null
    };

    this.props.addTimesheetLine(ts);

    this.setState({
      isEditing: true,
      currentTimesheet: ts
    });
  }

  editTimesheet(ts) {
    this.setState({
      isEditing: true,
      currentTimesheet: Object.assign({}, ts)
    });
  }

  saveTimesheet() {
    if (this.state.currentTimesheet.id === -1) {
      this.props.createTimesheet(this.state.currentTimesheet, () => {
        this.cancelEditing();
      });
    } else {
      this.props.editTimesheet(this.state.currentTimesheet, () => {
        this.cancelEditing();
      });
    }
  }

  addTimesheetEntry(ts) {
    this.props.addTimesheetEntry(ts, () => {
      this.props.fetchMonthTimesheets();
    });
  }

  deleteTimesheet(ts) {
    this.props.deleteTimesheet(ts, () => {
      this.props.fetchMonthTimesheets();
    });
  }

  cancelEditing() {
    this.setState({
      isEditing: false,
      currentTimesheet: {}
    });

    this.props.fetchMonthTimesheets();
  }

  updateField(field, event) {
    this.state.currentTimesheet[field] = event.target.value;
  }

  renderTimesheets() {
    return _.map(this.props.timesheets, ts => this.renderFields(ts));
  }

  renderButtons(ts) {
    if (this.state.isEditing && this.state.currentTimesheet.id === ts.id) {
      return (
        <div>
          <button className="btn btn-primary" onClick={this.saveTimesheet}>
            Salvar
          </button>
          <button className="btn btn-primary" onClick={this.cancelEditing}>
            Cancelar
          </button>
        </div>
      );
    }
    return (
      <div>
        <button
          className="btn btn-primary"
          onClick={() => this.editTimesheet(ts)}
        >
          Editar
        </button>
        <button
          className="btn btn-primary"
          onClick={() => this.deleteTimesheet(ts)}
        >
          Deletar
        </button>
      </div>
    );
  }

  renderFields(ts) {
    if (this.state.isEditing && this.state.currentTimesheet.id === ts.id) {
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
        <td>{ts.diff}</td>
        <td>{ts.accDiff}</td>
        <td>{this.renderButtons(ts)}</td>
      </tr>
    );
  }

  renderInputFields(ts) {
    return (
      <tr key={ts.id}>
        <td>{ts.workday}</td>
        <td>
          <input
            type="text"
            defaultValue={ts.entry_1}
            onChange={e => this.updateField("entry_1", e)}
          />
        </td>
        <td>
          <input
            type="text"
            defaultValue={ts.entry_2}
            onChange={e => this.updateField("entry_2", e)}
          />
        </td>
        <td>
          <input
            type="text"
            defaultValue={ts.entry_3}
            onChange={e => this.updateField("entry_3", e)}
          />
        </td>
        <td>
          <input
            type="text"
            defaultValue={ts.entry_4}
            onChange={e => this.updateField("entry_4", e)}
          />
        </td>
        <td>{ts.diff}</td>
        <td>{ts.accDiff}</td>
        <td>{this.renderButtons(ts)}</td>
      </tr>
    );
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <button className="btn btn-primary" onClick={this.createTimesheet}>
            Add a Timesheet
          </button>
          <button
            className="btn btn-primary"
            onClick={this.addTimesheetEntry}
          >
            Add an entry
          </button>
        </div>
        <h3>Timesheets</h3>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Dia</th>
              <th>1ª Entrada</th>
              <th>1ª Saída</th>
              <th>2ª Entrada</th>
              <th>2ª Saída</th>
              <th>Total</th>
              <th>Saldo</th>
              <th />
            </tr>
          </thead>
          <tbody>{this.renderTimesheets()}</tbody>
        </table>
      </div>
    );
  }
}

TimesheetIndex.propTypes = {
  timesheets: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchMonthTimesheets: PropTypes.func.isRequired,
  addTimesheetLine: PropTypes.func.isRequired,
  createTimesheet: PropTypes.func.isRequired,
  editTimesheet: PropTypes.func.isRequired,
  deleteTimesheet: PropTypes.func.isRequired,
  addTimesheetEntry: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  timesheets: state.timesheets
});

const mapDispatchToProps = {
  fetchMonthTimesheets,
  addTimesheetLine,
  createTimesheet,
  editTimesheet,
  deleteTimesheet,
  addTimesheetEntry
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimesheetIndex);
