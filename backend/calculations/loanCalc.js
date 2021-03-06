import { calculateLoanAmt } from './calculateLoanAmt';

export const loanCalc = (income) => {
  const loanAmt = calculateLoanAmt(income);

  return Promise.resolve({
    loan: {
      fiveYearPayoff: loanAmt.payoff,
      annualLoanAmt: loanAmt.max,
      interestRate: loanAmt.interest,
    },
  });
};

export default loanCalc;
