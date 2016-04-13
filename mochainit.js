import 'babel-polyfill'

import appModulePath from 'app-module-path';
import path from 'path';
import environmental from 'environmental'
import './src/initializers/server/globals'

appModulePath.addPath(path.join(process.cwd(), '/src'))
