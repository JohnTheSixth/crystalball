export const logical = (event) => {
  const queryString = event.queryStringParameters;
  // eslint-disable-next-line no-console
  console.log('QUERY STRING: ', queryString);
};

export const handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);
};
