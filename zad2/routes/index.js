const { renderPage: renderHomePage } = require('../views/home');
const { renderPage: renderAddCarPage } = require('../views/add-car');
const { renderPage: renderCarPage } = require('../views/car');
const fs = require('fs');
const querystring = require('querystring');

const handleHome = (res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write(renderHomePage());
  res.end();
}

const handleAddCar = (method, req, res) => {
  if (method === 'GET') {
    res.setHeader('Content-Type', 'text/html');
    res.write(renderAddCarPage());
    res.end();
  } else if (method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const parsedData = querystring.parse(body);
      fs.writeFile('formData.json', JSON.stringify(parsedData), (err) => {
        if (err) throw err;
        res.statusCode = 302;
        res.setHeader('Location', '/car');
        res.end();
      });
    });
  }
}

const handleCar = (res) => {
  fs.readFile('formData.json', 'utf8', (err, data) => {
    if (err) throw err;
    const carData = data.toString();
    res.setHeader('Content-Type', 'text/html');
    res.write(renderCarPage(carData));
    res.end();
  });
}

const handlePageNotFound = (res)  => {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/html');
  res.write('404 Page Not Found');
  res.end();
}

module.exports = {
  handleHome,
  handleAddCar,
  handleCar,
  handlePageNotFound
};


