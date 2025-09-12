const https = require('https');
const http = require('http');

async function testAPI() {
  console.log('Testing Resources API...\n');
  
  // Test GET request
  const options = {
    hostname: 'localhost',
    port: 3008,
    path: '/api/admin/resources',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      console.log(`Status Code: ${res.statusCode}`);
      console.log(`Headers:`, res.headers);

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log('\nResponse Body:');
        console.log(data.substring(0, 500)); // Show first 500 chars
        if (data.length > 500) {
          console.log('... (truncated)');
        }

        try {
          const parsed = JSON.parse(data);
          console.log('\nParsed JSON successfully');
          console.log('Resources count:', parsed.resources ? parsed.resources.length : 'N/A');
        } catch (e) {
          console.log('\nFailed to parse JSON:', e.message);
          console.log('Raw response type:', typeof data);
        }

        resolve();
      });
    });

    req.on('error', (error) => {
      console.error('Request error:', error);
      reject(error);
    });

    req.end();
  });
}

// Test POST request
async function testPOST() {
  console.log('\n\nTesting POST request...\n');
  
  const postData = JSON.stringify({
    name: 'API Test Book',
    description: 'A book created via API test',
    category: 'book',
    location: 'Library Test Section',
    condition: 'good',
    isAvailable: true,
    status: 'active',
    requiresApproval: false,
    tags: ['test', 'api'],
    author: 'API Test Author',
    totalCopies: 1,
    image: null
  });

  const options = {
    hostname: 'localhost',
    port: 3008,
    path: '/api/admin/resources',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      console.log(`POST Status Code: ${res.statusCode}`);

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log('POST Response:');
        console.log(data);
        resolve();
      });
    });

    req.on('error', (error) => {
      console.error('POST Request error:', error);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function runTests() {
  try {
    await testAPI();
    await testPOST();
    await testAPI(); // Test GET again to see if POST worked
  } catch (error) {
    console.error('Test failed:', error);
  }
}

runTests();
