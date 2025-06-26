import http from 'http';

// Test health endpoint
const testHealth = () => {
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/health',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    console.log('✅ Health check status:', res.statusCode);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('Health response:', JSON.parse(data));
      testContactSubmit();
    });
  });

  req.on('error', (error) => {
    console.error('❌ Health check failed:', error.message);
  });

  req.end();
};

// Test contact form submission
const testContactSubmit = () => {
  const testData = JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    message: 'This is a test message from the API test script.'
  });

  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/contact/submit',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(testData)
    }
  };

  const req = http.request(options, (res) => {
    console.log('✅ Contact form status:', res.statusCode);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('Contact form response:', JSON.parse(data));
    });
  });

  req.on('error', (error) => {
    console.error('❌ Contact form test failed:', error.message);
  });

  req.write(testData);
  req.end();
};

// Wait a moment for server to start, then test
setTimeout(() => {
  console.log('🧪 Testing API endpoints...');
  testHealth();
}, 2000);