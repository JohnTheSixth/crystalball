import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import {
  DropDownMenu,
  MenuItem,
  TextField,
  RaisedButton,
  Card,
  CardHeader,
  AppBar,
} from 'material-ui';
import { getMuiTheme, lightBaseTheme } from 'material-ui/styles';

import muiThemeProps from './propTypes';
import usStates from './data/states.json';
import getAllMajors from './data/getMajorsRequest';
import handleSubmit from './data/submitForm';

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
      submitted: false,
      submitting: false,
      responseData: null,
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

  handleStateChange = (event, index, value) => {
    this.setState({
      ...this.state,
      userState: value,
    });
  }

  handleClick = () => {
    this.setState({
      ...this.state,
      submitting: true,
      submitted: true,
    });

    console.log('STATE:', this.state);
    handleSubmit(this.state)
      .then((response) => {
        console.log('RESPONSE:', response);
        this.setState({
          ...this.state,
          submitting: false,
          responseData: response,
        });
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
    console.log('STATE:', this.state);
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <AppBar
              style={{ fontFamily: this.props.muiTheme.fontFamily }}
              showMenuIconButton={false}
              title="PriceMeow: Finding Colleges to Make Your Wallet Purr"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={10} xsOffset={1}>
            <Card
              expandable
              initiallyExpanded
              expanded={!this.state.submitted}
              style={{ width: '100%', marginTop: '10px' }}
            >
              <CardHeader
                title="Tell us your secrets..."
                showExpandableButton
                style={{ backgroundColor: '#d3d3d3' }}
              />
              <Row>
                <Col xs={12} sm={12} md={10} mdOffset={1}>
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
                <Col xs={12} sm={12} md={10} mdOffset={1}>
                  <TextField
                    onChange={this.handleInput}
                    name="currentIncome"
                    floatingLabelText="What is your current annual salary?"
                    value={this.state.currentIncome}
                    fullWidth
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={10} mdOffset={1}>
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
                <Col xs={12} sm={12} md={10} mdOffset={1}>
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
                <Col xs={12} sm={12} md={10} mdOffset={1}>
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
                <Col xs={12} sm={12} md={10} mdOffset={1}>
                  <RaisedButton
                    primary
                    label="Submit"
                    onClick={this.handleClick}
                    style={{ marginTop: '20px', marginBottom: '20px' }}
                  />
                </Col>
              </Row>
            </Card>
            <Card
              expandable
              expanded={this.state.submitted}
              style={{ width: '100%' }}
            >
              <CardHeader
                title="And we'll tell you no lies."
                showExpandableButton
                actAsExpander
                style={{ backgroundColor: '#d3d3d3' }}
              />
              {this.state.responseData}
            </Card>
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
