/*
  Summary: You should not take out a loan that exceeds ${Math.floor(initialLoanAmt)} dollars.
  Compounded annually at an interest rate of ${(yearlyInterest - 1) * 100}%, the final loan
  amount will total $${fiveYearPayoff}, which at your current income will take 5 years to
  pay off completely, if you dedicate 25% of your current income to your loan payoffs.
*/

const loanCalc = (income) => {
  const fiveYearPayoff = Math.floor((income * 5) * 0.25);
  const yearlyInterest = 1.0429; // Data drawn from US News & World Report

  let initialLoanAmt = fiveYearPayoff;
  for (let i = 0; i < 5; i + 1) {
    initialLoanAmt /= yearlyInterest;
  }

  return Promise.resolve({
    loan: {
      fiveYearPayoff,
      initialLoanAmt,
      yearlyInterest,
    },
  });
};

export default loanCalc;
