import axios from 'axios';

const getMajorsRequest = axios({
  method: 'post',
  url: 'https://api.data.world/v0/sql/fivethirtyeight/college-majors',
  headers: {
    Authorization: process.env.AUTHKEY,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  data: `query=${encodeURIComponent('SELECT major_code, major FROM all_ages ORDER BY major ASC')}`,
});

export default getMajorsRequest;
