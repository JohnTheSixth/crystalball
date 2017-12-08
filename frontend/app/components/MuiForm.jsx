// absolute module imports
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import {
  AppBar,
  Card,
  CardHeader,
  Divider,
  DropDownMenu,
  MenuItem,
  RaisedButton,
  TextField,
} from 'material-ui';
import { getMuiTheme, lightBaseTheme } from 'material-ui/styles';

// relative module imports
import Results from './ResultsForm';
import muiThemeProps from './propTypes';

// data module imports
import usStates from './data/states.json';
import getAllMajors from './data/getMajorsRequest';
import handleSubmit from './data/submitForm';

class MuiForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collegeSavings: '',
      collegeSpending: '',
      currentIncome: '',
      majors: [],
      responseData: null,
      selectedMajor: '',
      submitted: false,
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
    handleSubmit(this.state)
      .then((response) => {
        this.setState({
          ...this.state,
          submitted: true,
          responseData: response.data,
        });
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  }

  handleExpand = () => this.setState({
    ...this.state,
    submitted: !this.state.submitted,
  });

  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <AppBar
              style={{
                fontFamily: this.props.muiTheme.fontFamily,
              }}
              showMenuIconButton={false}
              title="PriceMeow: Finding Colleges that Make Your Wallet Purr"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Card
              expanded={!this.state.submitted}
              style={{ width: '100%', marginTop: '10px' }}
            >
              <CardHeader
                title="Tell us your secrets..."
                style={{ backgroundColor: '#d3d3d3' }}
              />
              <Row expandable>
                <Col xs={10} xsOffset={1}>
                  <p>
                    {
                      'Here\'s how it works: enter your annual net income, the amount you\'ve saved ' +
                      'for college, and how much you plan on spending per month on your education. ' +
                      'Then select your major and your state. PriceMeow will tell you what you can afford ' +
                      'And what schools you should focus your attention on.'
                    }
                  </p>
                </Col>
              </Row>
              <Divider />
              <Row expandable>
                <Col xs={10} xsOffset={1}>
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
              <Row expandable>
                <Col xs={10} xsOffset={1}>
                  <TextField
                    onChange={this.handleInput}
                    name="currentIncome"
                    floatingLabelText="What is your current annual NET salary?"
                    value={this.state.currentIncome}
                    fullWidth
                  />
                </Col>
              </Row>
              <Row expandable>
                <Col xs={10} xsOffset={1}>
                  <TextField
                    onChange={this.handleInput}
                    name="collegeSavings"
                    floatingLabelText="How much do you currently have saved for college?"
                    value={this.state.collegeSavings}
                    fullWidth
                  />
                </Col>
              </Row>
              <Row expandable>
                <Col xs={10} xsOffset={1}>
                  <TextField
                    onChange={this.handleInput}
                    name="collegeSpending"
                    floatingLabelText="How much do you expect to spend on college per month?"
                    value={this.state.collegeSpending}
                    fullWidth
                  />
                </Col>
              </Row>
              <Row expandable>
                <Col xs={10} xsOffset={1}>
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
              <Row expandable>
                <Col xs={10} xsOffset={1}>
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
              expanded={this.state.submitted}
              style={{ width: '100%', marginTop: '10px' }}
            >
              <CardHeader
                title="And we'll tell you no lies."
                style={{ backgroundColor: '#d3d3d3' }}
              />
              <Results
                expandable
                results={this.state.responseData}
                userState={this.state.userState}
              />
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
