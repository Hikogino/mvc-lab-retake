const http = require('http');
const { getHTMLDocumentStart, getHTMLDocumentEnd } = require('./htmlGenerator');
const { getCars, getCarInformation, getCarAge } = require('./cars');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const cars = getCars();
    console.log(cars);
  
    const carInfo = getCarInformation(2); 
    const carAge = getCarAge(2); 
  
    res.setHeader('Content-Type', 'text/html');
    res.write(getHTMLDocumentStart());
    res.write('<body>');
    res.write(`<p>${carInfo}</p>`);
    res.write(`<p>${carAge}</p>`);
    res.write('</body>');
    res.write(getHTMLDocumentEnd());
    res.end();
  });
  
  server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`);
  });