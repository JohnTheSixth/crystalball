import axios from 'axios';

const submitForm = ({
  selectedMajor: major,
  currentIncome,
  collegeSavings,
  collegeSpending,
  userState: state,
}) => axios({
  method: 'get',
  url: process.env.AWS_API_URL,
  params: {
    major,
    currentIncome,
    collegeSavings,
    collegeSpending,
    state,
  },
});

export default submitForm;
