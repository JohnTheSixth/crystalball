/*
Shape of queryStringParameters from the event:
  queryStringParameters: {
    major: string,
    currentIncome: int,
    collegeSavings: int,
    collegeSpending: int,
    state: string
  }

Shape of `results` passed to the summary function:
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
      higherLoanAmt,
      totalYearlySpending,
      schools,
    }
  }
*/

import { loanCalc } from './calculations/loanCalc';
import { incomeCalc } from './calculations/incomeCalc';
import { affordabilityCalc } from './calculations/affordabilityCalc';
import { summary } from './calculations/summary';

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
      const higherLoanAmt = Math.max(income.adjustedLoanAmt, results.loan.annualLoanAmt);

      results.income = income;
      results.affordability = { higherLoanAmt };

      return affordabilityCalc(
        query.collegeSavings,
        query.collegeSpending,
        results.affordability.higherLoanAmt,
        query.state,
      );
    })
    .then(({ totalYearlySpending, schools }) => {
      results.affordability = {
        ...results.affordability,
        totalYearlySpending,
        schools,
      };

      return summary(results);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(err));
      throw new Error(err);
    });
};

export const handler = (event, context, callback) => {
  const response = (fullSummary, status) => ({
    statusCode: status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': 'snaphuntjwttoken',
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fullSummary),
  });

  return logical(event)
    .then(fullSummary => callback(null, response(fullSummary, 200)))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(err));
      callback(response(err, 422), null);
    });
};
