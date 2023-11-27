// functions/fetchData.ts

import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  try {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      throw new Error('API key is not defined.');
    }

    // Use apiKey in your fetch or any other logic
    const data = await fetchDataFromApi(apiKey);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "not responding" }),
    };
  }
};

async function fetchDataFromApi(apiKey: string): Promise<any> {
  // Implement your data fetching logic here using apiKey
  // For example, fetch data from an API using axios or fetch
  // Return the fetched data
  return { message: 'Data fetched successfully' };
}
