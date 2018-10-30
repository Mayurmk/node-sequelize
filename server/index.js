const server = require('./server');
const config = require('./config');

server.listen(config.port, () => {
   console.log(`Server started on port ${config.port}`);
});

module.exports = server;