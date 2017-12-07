/*
Input from User:
  queryStringParameters: {
    major: string,
    currentIncome: int,
    collegeSavings: int,
    collegeSpending: int,
    state: string
  }

Results:
  {
    loan: {
      fiveYearPayoff,
      annualLoanAmt,
      interestRate,
    },
    income: {
      medianIncome,
      percentChange,
      adjustedLoanAmt,
      fiveYearPayoff,
      interestRate,
    },
    affordability: {
      totalYearlySpending,
      schools,
    }
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

      return incomeCalc(
        query.major,
        query.currentIncome,
      );
    })
    .then(({ income }) => {
      results.income = income;

      return affordabilityCalc(
        query.collegeSavings,
        query.collegeSpending,
        income.adjustedLoanAmt,
        query.state,
      );
    })
    .then(({ affordability }) => {
      results.affordability = affordability;

      return summary(results);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      return new Error(err);
    });
};

export const handler = (event, context, callback) => {
  const response = fullSummary => ({
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': 'snaphuntjwttoken',
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Content-Type': 'application/json',
    },
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
