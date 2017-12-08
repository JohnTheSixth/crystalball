import { handler, logical } from '../index';

const mockEvent = {
  queryStringParameters: {
    major: 'BASKET WEAVING',
    currentIncome: 20000,
    collegeSavings: 5000,
    collegeSpending: 200,
    state: 'WY',
  },
};

jest.mock('../calculations/loanCalc', () => ({
  loanCalc: () => Promise.resolve({
    loan: {
      fiveYearPayoff: 20000,
      annualLoanAmt: 8000,
      interestRate: 4.29,
    },
  }),
}));

jest.mock('../calculations/incomeCalc', () => ({
  incomeCalc: () => Promise.resolve({
    income: {
      medianIncome: 10000,
      percentChange: -50,
      adjustedLoanAmt: 4000,
      fiveYearPayoff: 10000,
      interestRate: 4.29,
    },
  }),
}));

jest.mock('../calculations/affordabilityCalc', () => ({
  affordabilityCalc: () => Promise.resolve({
    affordability: {
      totalYearlySpending: 6000,
      schools: [{
        tuition_and_fees: 5.3,
        in_state: null,
        name: 'Free State University',
        location: 'Portland, ME',
        description: 'A free school for free people',
      }],
    },
  }),
}));

jest.mock('../calculations/summary', () => ({
  summary: () => Promise.resolve({
    loanSummary: 'LOL you shouldn\'t be asking anyone for money',
    incomeSummary: 'LOL you broke son',
    affordabilitySummary: 'You can\'t afford a degree in basket weaving',
    schoolsSummary: [],
  }),
}));

describe('logical', () => {
  it('returns a summary of the user\'s financial information', () => logical(mockEvent)
    .then(result => expect(result).toEqual({
      loanSummary: 'LOL you shouldn\'t be asking anyone for money',
      incomeSummary: 'LOL you broke son',
      affordabilitySummary: 'You can\'t afford a degree in basket weaving',
      schoolsSummary: [],
    }))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log('ERROR IN TEST:', err);
      expect('Error thrown, should not get here').not.toBeDefined();
    }));
});

describe('handler', () => {
  it('returns a 200 response with correct data', () =>
    handler(mockEvent, null, (err, data) => err || data)
      .then(result => expect(result).toEqual({
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Headers': 'snaphuntjwttoken',
          'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loanSummary: 'LOL you shouldn\'t be asking anyone for money',
          incomeSummary: 'LOL you broke son',
          affordabilitySummary: 'You can\'t afford a degree in basket weaving',
          schoolsSummary: [],
        }),
      }))
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('ERROR IN TEST:', err);
        expect('Error thrown, should not get here').not.toBeDefined();
      }));
});
