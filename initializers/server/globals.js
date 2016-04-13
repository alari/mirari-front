const config = require('environmental').config()

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVTOOLS__ = false;
global.__ENV__ = config.env;
global.__REQUEST_API_ENDPOINT__ = config.api.request ? config.api.request.endpoint : `http://localhost:${ config.app.port }/api`;
