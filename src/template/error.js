export default function(error){
  return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <title>报错了</title>
    <meta charset="utf-8">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
    <meta http-equiv="Cache-Control" max-age="none">
    <meta name="renderer" content="webkit">
    <style>
    html {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 2rem;
      height: 100%;
      font-family: sans-serif;
      text-align: center;
      color: #f30909;
      background: azure;
      font-size: 16px;
    }

    body {
      margin: 0;
    }

    h1 {
      font-weight: 400;
      color: #555;
    }

    pre {
      white-space: pre-wrap;
      text-align: left;
    }
    </style>
  </head>

  <body>
    <div>
      <h1>Error</h1>
      <pre>${error}</pre>
    </div>
  </body>

  </html>
  `
}
