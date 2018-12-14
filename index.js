const http = require('http');
const server = http.createServer((req, res) => {
    console.log(req.url);
    res.end('hello User');
});
server.listen(4000, () => console.log('Server is up and running at port 4000'));
