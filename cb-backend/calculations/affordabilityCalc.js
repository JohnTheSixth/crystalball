/*
  Summary: Including your initial loan amount, you have a total of ${totalYearlySpending}
  to spend per year on your education. Out of the top 230 schools in the United States,
  you can afford to go to ${schoolCount} of those.
*/

import axios from 'axios';

const sqlQuery = (yearlySpending, state) => 'SELECT tuition_and_fees, in_state, name, location, description ' +
  'FROM national_universities_rankings ' +
  `WHERE tuition_and_fees <= ${yearlySpending / 1000} ` +
  `OR (location LIKE '%, ${state}' AND in_state <= ${yearlySpending / 1000}) ` +
  'ORDER BY rank ASC LIMIT 231';

const affordabilityCalc = (savings, spending, loanAmt, state) => {
  const totalYearlySpending = (savings / 4) + (spending * 12) + (loanAmt / 4);

  return axios({
    method: 'post',
    url: 'https://api.data.world/v0/sql/ian/united-states-university-rankings',
    headers: {
      Authorization: process.env.AUTHKEY,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: { query: sqlQuery(totalYearlySpending, state) },
  })
    .then(affordableSchools => ({
      affordability: {
        totalYearlySpending,
        schools: affordableSchools,
      },
    }))
    .catch(err => new Error(err));
};

export default affordabilityCalc;
