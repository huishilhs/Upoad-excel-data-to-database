var app = require("./controller/upload");

var port = 8081;
var hostname = "localhost";

app.listen(port, hostname, () => {
  console.log(`Server ready and accessible at http://${hostname}:${port}`);
});
