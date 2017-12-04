/*
  Summary: The median income for graduates in your major is $${medianIncome} per year.
  This is a ${percentChange}% ${percentChange < 0 ? 'decrease' : 'increase'} from
  your current income.
*/

import axios from 'axios';

const sqlQuery = major => `SELECT median FROM all_ages WHERE major=${major.toUpperCase()}`;

const incomeScore = (major, currentIncome) => axios({
  method: 'post',
  url: 'https://api.data.world/v0/sql/fivethirtyeight/college-majors',
  headers: {
    Authorization: process.env.AUTHKEY,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  data: { query: sqlQuery(major) },
})
  .then((income) => {
    const medianIncome = income[0].median;
    const percentChange = Math.round(((medianIncome / currentIncome) - 1) * 10000) / 100;

    return {
      income: {
        medianIncome,
        percentChange,
      },
    };
  })
  .catch(err => new Error(err));

export default incomeScore;
