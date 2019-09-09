var StaticServer = require('static-server');

const server = new StaticServer({
    rootPath: './dist',
    port: 3000
})
 server.start(() => {
     console.log('server start on port', server.port);
 })