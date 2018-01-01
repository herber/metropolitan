const untag = require('untag');

exports.notFound = () => {
  return untag`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>404 - Not found</title>
      <style media="screen">
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
          display: flex;
          justify-content: center;
          flex-direction: column;
          height: 100vh;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <h1>404 - Not found</h1>
    </body>
  </html>
  `;
};
