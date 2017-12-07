export const summary = results => ({
  loanSummary: `Based on your current annual income, you should not take out a loan that exceeds $${results.loan.annualLoanAmt}. ` +
    `Compounded annually at an interest rate of ${results.loan.interestRate}%, the final loan amount ` +
    `will total $${results.loan.fiveYearPayoff}. At your current income level, it will take you 5 years to pay off ` +
    'this amount completely, if you dedicate 10% of your current monthly income to your loan payoffs.',
  incomeSummary: `The median income for graduates in your chosen major is $${results.income.medianIncome} per year. ` +
    `This is a ${results.income.percentChange}% ${results.income.percentChange < 0 ? 'decrease' : 'increase'} from ` +
    'your current income. Based on this potential future income, it will take you 5 years to pay off an amount of ' +
    `$${results.income.fiveYearPayoff}, if you dedicate 10% of your potential future monthly income to your loan payoffs. ` +
    `With this in mind, the total amount you borrow should not exceed $${results.income.adjustedLoanAmt}, ` +
    `given that a loan of this amount is compounded annually at ${results.income.interestRate}.`,
  affordabilitySummary: `When counting your adjusted loan amount, you have a total of $${results.affordability.totalYearlySpending} ` +
    'to spend per year on education, given a 4-year program. Out of the top 231 schools in the United States, ' +
    `you can afford to go to ${results.affordability.schools.length} of those.`,
  schoolsSummary: results.affordability.schools,
});

export default summary;
