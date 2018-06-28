import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment-timezone";

import { fetchMonthTimesheets, addTimesheetEntry } from "../../../actions";

import "./styles.scss"

class EntryCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovered: false,
      currentTime: moment.tz('America/Sao_Paulo').format('HH:mm')
    };

    this.handleHover = this.handleHover.bind(this)
    this.addTimesheetEntry = this.addTimesheetEntry.bind(this);
    
    setInterval(() => {
      this.setState({
        currentTime: moment.tz('America/Sao_Paulo').format('HH:mm')
      })
    }, 1000);
  }

  handleHover() {
    this.setState({
      isHovered: !this.state.isHovered
    });
  }

  addTimesheetEntry() {
    this.props.addTimesheetEntry(() => {
      this.props.fetchMonthTimesheets()
    });
  }

  render() {
    let style = "card text-center text-white mb-3"
    style += this.state.isHovered ? " bg-primary-hover" : " bg-primary";

    return (
      <div className={style} id="entry-card" onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} onClick={this.addTimesheetEntry}>
        <div className="card-body">
          <h3>Preencher Ponto</h3>
          <span className="d-block mt-4" style={{ fontSize: '48px' }}><i className="fas fa-pencil-alt"></i> {this.state.currentTime}</span>
          {/* <h4 className="display-4 mt-4">
            <i className="fas fa-pencil-alt"></i> {this.state.currentTime}
          </h4> */}
        </div>
      </div>
    );
  }
}

EntryCard.propTypes = {
  fetchMonthTimesheets: PropTypes.func.isRequired,
  addTimesheetEntry: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  fetchMonthTimesheets,
  addTimesheetEntry
};

export default connect(
  null,
  mapDispatchToProps
)(EntryCard);
