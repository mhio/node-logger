@mhio/logger
-----------

Node logging with [`pino`](https://github.com/pinojs/pino) and [`debug`](https://github.com/visionmedia/debug).

```
yarn add @mhio/logger
```

Setup a base logger in `./logger.js`
```
import { MhioLogger } from '@mhio/node-logger'
export const Logger = new MhioLogger('your:log:prefix')
export default Logger
// or
const { MhioLogger } = require('@mhio/node-logger')
const Logger = new MhioLogger('your:log:prefix')
module.exports = Logger
```

Then in each module
```
import Logger from './logger'
const Logger = require('./logger')

const { logger, debug } = Logger.ns('myModule')

// Pino
logger.info({ msg: 'test', data: {} })

// DEBUG="your:prefix" node app.js
debug('test', { ok: true })
```

## Changelog

0.3.0 Upgrade to pino 6, remove debug as it's a runtime injection

0.2.0 Remove `{namespace}` duplication from loggers metadata

## Related

[`@mhio/node-logger-http`](https://github.com/mhio/node-logger-http)
