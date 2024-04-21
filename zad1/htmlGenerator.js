const getHTMLDocumentStart = () => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name-"viewport" content="width=device-width, initial-scale=1.0">
        <title>Cars</title>
      </head>`;
  }
  
const getHTMLDocumentEnd = () => {
    return `
      </html>`;
  }
  
  module.exports = {
    getHTMLDocumentStart,
    getHTMLDocumentEnd
  };
  

