import axios from 'axios';

import { calculateLoanAmt } from './calculateLoanAmt';

const sqlQuery = major => `SELECT median FROM all_ages WHERE major='${major.toUpperCase()}'`;

export const incomeCalc = (major, currentIncome) => axios({
  method: 'post',
  url: 'https://api.data.world/v0/sql/fivethirtyeight/college-majors',
  headers: {
    Authorization: process.env.AUTHKEY,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  data: `query=${encodeURIComponent(sqlQuery(major))}`,
})
  .then((response) => {
    const medianIncome = response.data[0].median;
    const percentChange = Math.round(((medianIncome / currentIncome) - 1) * 10000) / 100;
    const loanAmt = calculateLoanAmt(medianIncome);

    return {
      income: {
        medianIncome,
        percentChange,
        adjustedLoanAmt: loanAmt.max,
        fiveYearPayoff: loanAmt.payoff,
        interestRate: loanAmt.interest,
      },
    };
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
    return new Error(err);
  });

export default incomeCalc;
