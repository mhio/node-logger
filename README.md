@mhio/logger
-----------

Node logging with [`pino`](https://github.com/pinojs/pino) and [`debug`](https://github.com/visionmedia/debug).

Setup a base logger in `Logger.js`
```
import { MhioLogger } from '@mhio/node-logger'
export const Logger = new MhioLogger('your:prefix')
```

Then in each module
```
import Logger from '@mhio/node-logger'
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
