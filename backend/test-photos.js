const https = require('https');

const url = 'https://photos.app.goo.gl/9evp3WMAZHvjxktXA';

https.get(url, (res) => {
  if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
    console.log('Redirecting to:', res.headers.location);
    https.get(res.headers.location, (res2) => {
      let data = '';
      res2.on('data', chunk => data += chunk);
      res2.on('end', () => {
        const match = data.match(/<meta property="og:image" content="([^"]+)"/);
        if (match) {
          console.log('Found image:', match[1]);
        } else {
          console.log('No og:image found');
        }
      });
    });
  }
});
