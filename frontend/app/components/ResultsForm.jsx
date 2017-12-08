import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Tab, Tabs } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';

const getTuition = (userState, school) => {
  const schoolState = school.location.substring(school.location.length - 2);

  if (userState === schoolState) return school.in_state;
  return school.tuition_and_fees;
};

const ResultsForm = props => (
  <Tabs>
    <Tab label="Loan">
      <Row>
        <Col xs={10} xsOffset={1}>
          <p>{props.results.loanSummary}</p>
        </Col>
      </Row>
    </Tab>
    <Tab label="Potential Income">
      <Row>
        <Col xs={10} xsOffset={1}>
          <p>{props.results.incomeSummary}</p>
        </Col>
      </Row>
    </Tab>
    <Tab label="Affordability">
      <Row>
        <Col xs={10} xsOffset={1}>
          <p>{props.results.affordabilitySummary}</p>
        </Col>
      </Row>
    </Tab>
    <Tab label="Schools">
      <Row>
        <Col xs={10} xsOffset={1}>
          <p>
            {
              props.results.schoolsSummary.length > 10
              ? 'Here are the top 10 schools you can afford:'
              : `Here are the ${props.results.schoolsSummary.length} schools you can afford:`
            }
          </p>
          {
            props.results.schoolsSummary.map(school => (
              <div key={school.name}>
                <Divider />
                <p style={{ fontWeight: '700', marginLeft: '20px' }}>{school.name}</p>
                <ul>
                  <li>{`Annual Price: $${Math.round((getTuition(props.userState, school)) * 1000)}`}</li>
                  <li>{`Location: ${school.location}`}</li>
                  <li>{`Rank (out of 231): ${school.rank}`}</li>
                </ul>
              </div>
            ))
          }
        </Col>
      </Row>
    </Tab>
  </Tabs>
);

ResultsForm.propTypes = {
  results: PropTypes.shape({
    loanSummary: PropTypes.string,
    incomeSummary: PropTypes.string,
    affordabilitySummary: PropTypes.string,
    schoolsSummary: PropTypes.array,
  }),
  userState: PropTypes.string,
};

ResultsForm.defaultProps = {
  results: {
    loanSummary: '',
    incomeSummary: '',
    affordabilitySummary: '',
    schoolsSummary: [],
  },
  userState: 'AL',
};

export default ResultsForm;
