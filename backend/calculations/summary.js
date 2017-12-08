export const summary = ({ loan, income, affordability }) => ({
  loanSummary: `Based on your current annual income, you should not take out a loan that exceeds $${loan.annualLoanAmt}. ` +
    `Compounded annually at an interest rate of ${loan.interestRate}%, the final loan amount ` +
    `will total $${loan.fiveYearPayoff}. At your current income level, it will take you 5 years to pay off ` +
    'this amount completely, if you dedicate 10% of your current monthly income to your loan payoffs.',
  incomeSummary: `The median income for graduates in your chosen major is $${income.medianIncome} per year. ` +
    `This is a ${income.percentChange}% ${income.percentChange < 0 ? 'decrease' : 'increase'} from ` +
    'your current income. Based on this potential future income, it will take you 5 years to pay off an amount of ' +
    `$${income.fiveYearPayoff}, if you dedicate 10% of your potential future monthly income to your loan payoffs. ` +
    `Based on this future earnings potential, the total amount you borrow should not exceed $${income.adjustedLoanAmt}, ` +
    `given that a loan of this amount is compounded annually at ${income.interestRate}%.`,
  affordabilitySummary: `The higher of your two possible loan amounts is $${affordability.higherLoanAmt}. ` +
    'This loan amount, combined with the amount you have saved for college and the amount you plan on spending per month, ' +
    `gives you a total of $${affordability.totalYearlySpending} to spend per year on a 4-year degree program. ` +
    `Out of the top 231 schools in the United States, you can afford to go to ${affordability.schools.length} of those.`,
  schoolsSummary: affordability.schools,
});

export default summary;
