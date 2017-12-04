/*
  queryStringParameters: {
    major: string,
    currentIncome: int,
    collegeSavings: int,
    collegeSpending: int,
    state: string
  }
*/

import loanCalc from './calculations/loanCalc';
import affordabilityCalc from './calculations/affordabilityCalc';
import incomeCalc from './calculations/incomeCalc';
import summary from './calculations/summary';

export const logical = (event) => {
  const query = event.queryStringParameters;
  const results = {};

  return loanCalc(query.currentIncome)
    .then(({ loan }) => {
      results.loan = loan;

      return affordabilityCalc(
        query.collegeSavings,
        query.collegeSpending,
        loan.initialLoanAmt,
        query.state,
      );
    })
    .then(({ affordability }) => {
      results.affordability = affordability;

      return incomeCalc(
        query.major,
        query.currentIncome,
      );
    })
    .then(({ income }) => {
      results.income = income;

      return summary(results);
    })
    .catch(err => new Error(err));
};

export const handler = (event, context, callback) => {
  const response = fullSummary => ({
    statusCode: 200,
    body: JSON.stringify(fullSummary),
  });

  logical(event)
    .then(fullSummary => callback(null, response(fullSummary)))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      return new Error(err);
    });
};
