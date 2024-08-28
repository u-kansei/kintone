const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { id } = event.queryStringParameters;

  const apiUrl = `https://a42w0hstpnt6.cybozu.com/k/v1/record.json?app=7&id=${id}`;
  const apiToken = 'vrnHC21JCg73EcDgJxLbn4kBIlOpjJ5O68fmkvke';

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-Cybozu-API-Token': apiToken,
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: 'API request failed' }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};
