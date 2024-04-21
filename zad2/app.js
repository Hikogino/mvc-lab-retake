const http = require("http");
const { handleHome, handleAddCar, handleCar, handlePageNotFound } = require("./routes/index")

const PORT = 3000;
const SERVER = http.createServer((request, response) => {
    const { url, method } = request;
  
    if (url === '/' && method === 'GET') {
      handleHome(response);
    } else if (url === '/add-car') {
      handleAddCar(method, request, response);
    } else if (url === '/car' && method === 'GET') {
      handleCar(response);
    } else {
      handlePageNotFound(response);
    }
  });
  SERVER.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });