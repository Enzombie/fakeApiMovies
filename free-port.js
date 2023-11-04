const net = require('node:net')

function findAvaiblePort(desiredPort) {
    return new Promise((resolve, reject) =>{
        const server = net.createServer()

        server.listen(desiredPort, () => {
            const {port} = server.address()
            server.close(() => {
                resolve(port)
            })
        })

        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                findAvaiblePort(0).then(port => resolve(port)) 
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {findAvaiblePort}