const summary = results => ({
  loanSummary: `You should not take out a loan that exceeds ${Math.floor(results.loan.initialLoanAmt)} dollars. ` +
    `Compounded annually at an interest rate of ${(results.loan.yearlyInterest - 1) * 100}%, the final loan amount ` +
    `will total $${results.loan.fiveYearPayoff}, which at your current income will take 5 years to pay off completely, ` +
    'if you dedicate 25% of your current income to your loan payoffs.',
  affordabilitySummary: `Including your initial loan amount, you have a total of ${results.affordability.totalYearlySpending} ` +
    'to spend per year on your education. Out of the top 230 schools in the United States, ' +
    `you can afford to go to ${results.affordability.schools.length} of those.`,
  incomeSummary: `The median income for graduates in your chosen major is $${results.income.medianIncome} per year. ` +
    `This is a ${results.income.percentChange}% ${results.income.percentChange < 0 ? 'decrease' : 'increase'} from ` +
    'your current income.',
});

export default summary;
