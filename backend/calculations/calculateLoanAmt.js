const calculateLoanAmt = (income) => {
  const monthlyPayment = Math.floor((income / 12) * 0.1);
  const fiveYearPayoff = monthlyPayment * 60;
  const yearlyInterest = 1.0429; // Data drawn from US News & World Report

  let annualLoanAmt = fiveYearPayoff;

  [1, 2, 3, 4, 5].forEach(() => {
    annualLoanAmt /= yearlyInterest;
  });

  return {
    max: Math.floor(annualLoanAmt),
    payoff: fiveYearPayoff,
    interest: (Math.round((yearlyInterest - 1) * 10000)) / 100,
  };
};

export default calculateLoanAmt;
