/*
  Summary: You should not take out a loan that exceeds ${Math.floor(initialLoanAmt)} dollars.
  Compounded annually at an interest rate of ${(yearlyInterest - 1) * 100}%, the final loan
  amount will total $${fiveYearPayoff}, which at your current income will take 5 years to
  pay off completely, if you dedicate 25% of your current income to your loan payoffs.
*/

const loanCalc = (income) => {
  console.log('LOANCALC CALLED');
  const fiveYearPayoff = Math.floor((income * 5) * 0.25);
  console.log('FIVE YEAR PAYOFF:', fiveYearPayoff);
  const yearlyInterest = 1.0429; // Data drawn from US News & World Report
  console.log('YEARLY INTEREST:', yearlyInterest);

  let initialLoanAmt = fiveYearPayoff;
  console.log('INITIAL LOAN AMOUNT: ', initialLoanAmt);

  [1, 2, 3, 4, 5].forEach(() => {
    initialLoanAmt /= yearlyInterest;
  });

  console.log('VALUE OF INITIAL LOAN AMT: ', initialLoanAmt);

  console.log('LOAN LOOP COMPLETED');
  return Promise.resolve({
    loan: {
      fiveYearPayoff,
      initialLoanAmt,
      yearlyInterest,
    },
  });
};

export default loanCalc;
