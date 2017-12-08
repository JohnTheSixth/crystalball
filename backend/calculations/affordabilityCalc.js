import axios from 'axios';

const sqlQuery = (yearlySpending, state) => 'SELECT tuition_and_fees, in_state, name, location, description ' +
  'FROM national_universities_rankings ' +
  `WHERE tuition_and_fees <= ${yearlySpending / 1000} ` +
  `OR (location LIKE '%, ${state}' AND in_state <= ${yearlySpending / 1000}) ` +
  'ORDER BY rank ASC';

export const affordabilityCalc = (savings, spending, loanAmt, state) => {
  const totalYearlySpending = (savings / 4) + (spending * 12) + (loanAmt / 4);

  return axios({
    method: 'post',
    url: 'https://api.data.world/v0/sql/ian/united-states-university-rankings',
    headers: {
      Authorization: process.env.AUTHKEY,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: `query=${encodeURIComponent(sqlQuery(totalYearlySpending, state))}`,
  })
    .then(response => ({
      affordability: {
        totalYearlySpending: Math.round(totalYearlySpending),
        schools: response.data,
      },
    }))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      return new Error(err);
    });
};

export default affordabilityCalc;
