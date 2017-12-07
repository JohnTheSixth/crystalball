import axios from 'axios';

const submitForm = ({
  selectedMajor: major,
  currentIncome,
  collegeSavings,
  collegeSpending,
  userState: state,
}) => axios({
  method: 'get',
  url: 'https://yclpi68ta6.execute-api.us-east-2.amazonaws.com/dev/meow',
  params: {
    major,
    currentIncome,
    collegeSavings,
    collegeSpending,
    state,
  },
});

export default submitForm;
