/*
  Summary: The median income for graduates in your major is $${medianIncome} per year.
  This is a ${percentChange}% ${percentChange < 0 ? 'decrease' : 'increase'} from
  your current income.
*/

import axios from 'axios';

const sqlQuery = major => `SELECT median FROM all_ages WHERE major='${major.toUpperCase()}'`;

const incomeCalc = (major, currentIncome) => {
  const sQuery = sqlQuery(major);
  console.log('QUERY: ', sQuery);

  return axios({
    method: 'post',
    url: 'https://api.data.world/v0/sql/fivethirtyeight/college-majors',
    headers: {
      Authorization: process.env.AUTHKEY,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: `query=${encodeURIComponent(sqlQuery(major))}`,
  })
    .then((response) => {
      console.log('INCOME:', response.data);
      const medianIncome = response.data[0].median;
      const percentChange = Math.round(((medianIncome / currentIncome) - 1) * 10000) / 100;

      return {
        income: {
          medianIncome,
          percentChange,
        },
      };
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      return new Error(err);
    });
};

export default incomeCalc;
