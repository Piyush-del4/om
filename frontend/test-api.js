/* eslint-disable @typescript-eslint/no-require-imports */
const fetch = require('node-fetch');

async function testApi() {
  const response = await fetch('http://localhost:5001/api/v1/astrology/proxy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      endpoint: 'planets',
      data: {
        year: 1990,
        month: 1,
        date: 1,
        hours: 12,
        minutes: 0,
        seconds: 0,
        latitude: 28.6139,
        longitude: 77.2090,
        timezone: 5.5,
        config: {
          observation_point: 'topocentric',
          ayanamsha: 'lahiri'
        }
      }
    }),
  });
  
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

testApi();
