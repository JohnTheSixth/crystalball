import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { DropDownMenu, MenuItem, TextField, RaisedButton } from 'material-ui';
import { getMuiTheme, lightBaseTheme } from 'material-ui/styles';

import muiThemeProps from './propTypes';
import usStates from './data/states.json';
import getAllMajors from './data/getMajorsRequest';

class MuiForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      majors: [],
      selectedMajor: '',
      currentIncome: '',
      collegeSavings: '',
      collegeSpending: '',
      userState: 'AL',
    };
  }

  componentDidMount = () => getAllMajors.then((result) => {
    this.setState({
      ...this.state,
      majors: result.data,
      selectedMajor: result.data[0].major,
    });
  // eslint-disable-next-line no-console
  }).catch(err => console.log(err));

  handleStateChange = (event, index, value) => {
    this.setState({
      ...this.state,
      userState: value,
    });
  }

  handleMajorChange = (event, index, value) => {
    this.setState({
      ...this.state,
      selectedMajor: value,
    });
  }

  handleInput = (event, newValue) => {
    const textFieldName = event.target.getAttribute('name');
    // eslint-disable-next-line prefer-destructuring
    const length = newValue.length;
    const presentChars = (length === 1) ? '' : newValue.substring(0, (length - 1));
    const newChar = newValue.substring(length - 1);

    // eslint-disable-next-line use-isnan
    const acceptedValue = Number.isNaN(parseInt(newChar, 10))
      ? presentChars
      : newValue;

    this.setState({
      ...this.state,
      [textFieldName]: acceptedValue,
    });
  }

  formatValue = () => {}

  render() {
    return (
      <div>
        <Row>
          <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
            <p style={{ fontFamily: this.props.muiTheme.fontFamily }}>
              Please select the State you live in:
            </p>
            <DropDownMenu
              value={this.state.userState}
              onChange={this.handleStateChange}
            >
              { usStates.map(stateData => (<MenuItem
                value={stateData.value}
                primaryText={stateData.name}
                key={stateData.value}
              />)) }
            </DropDownMenu>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
            <p style={{ fontFamily: this.props.muiTheme.fontFamily }}>
              Please select your major:
            </p>
            <DropDownMenu
              value={this.state.selectedMajor}
              onChange={this.handleMajorChange}
            >
              { this.state.majors.map(majorData => (<MenuItem
                value={majorData.major}
                primaryText={majorData.major}
                key={majorData.major_code}
              />)) }
            </DropDownMenu>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
            <TextField
              onChange={this.handleInput}
              name="currentIncome"
              floatingLabelText="What is your current salary?"
              value={this.state.currentIncome}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
            <TextField
              onChange={this.handleInput}
              name="collegeSavings"
              floatingLabelText="How much do you currently have saved?"
              value={this.state.collegeSavings}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
            <TextField
              onChange={this.handleInput}
              name="collegeSpending"
              floatingLabelText="How much do you expect to spend per month?"
              value={this.state.collegeSpending}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
            <br />
            <RaisedButton primary label="Submit" />
          </Col>
        </Row>
      </div>
    );
  }
}

MuiForm.propTypes = {
  muiTheme: PropTypes.shape(muiThemeProps),
};

MuiForm.defaultProps = {
  muiTheme: getMuiTheme(lightBaseTheme),
};

export default MuiForm;
