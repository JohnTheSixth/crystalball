import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui';

import SchoolsForm from './SchoolsForm';

const ResultsForm = props => (
  <Tabs>
    <Tab label="Loan Summary">
      <div style={{ padding: '10px' }}>
        {props.results.loanSummary}
      </div>
    </Tab>
    <Tab label="Income Summary">
      <div style={{ padding: '10px' }}>
        {props.results.incomeSummary}
      </div>
    </Tab>
    <Tab label="Affordability Summary">
      <div style={{ padding: '10px' }}>
        {props.results.affordabilitySummary}
      </div>
      <SchoolsForm schools={props.results.schoolsSummary} />
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
