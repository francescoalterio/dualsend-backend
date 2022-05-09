const os = require( 'os' );

const getLocalIP = () => {
    const interfaces = os.networkInterfaces();
    let myAddress = '';
    for (const name of Object.keys(interfaces)) {
        for (const address of interfaces[name]) {
            if (address.family === 'IPv4' && !address.internal) {
                myAddress = address.address;
            }
    
        }
    }

    return myAddress;
}

module.exports = getLocalIP;