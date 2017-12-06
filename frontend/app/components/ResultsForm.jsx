import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui';

const ResultsForm = props => (
  <Tabs>
    <Tab
      label="Loan Summary"
      style={{ padding: '5px' }}
    >
      {props.results.loanSummary}
    </Tab>
    <Tab
      label="Income Summary"
      style={{ padding: '5px' }}
    >
      {props.results.incomeSummary}
    </Tab>
    <Tab
      label="Affordability Summary"
      style={{ padding: '5px' }}
    >
      {props.results.affordabilitySummary}
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
};

ResultsForm.defaultProps = {
  results: {
    loanSummary: '',
    incomeSummary: '',
    affordabilitySummary: '',
    schoolsSummary: [],
  },
};

export default ResultsForm;
