const config = require('environmental').config()

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVTOOLS__ = false;
global.__ENV__ = config.env;
global.__REQUEST_API_ENDPOINT__ = (config.api.remote ? (config.api.remote.host + config.api.remote.path) : `http://mirari.ru/`) + config.api.root;
global.__AUTH_LOGIN_HREF__ = `/auth/in`;
global.__AUTH_FORBIDDEN_HREF__ = `/`;
