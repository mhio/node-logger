const rdebug = require('debug')
const pino = require('pino')

const noop = function noop() { }

class MhioLogger {

  static initialiseClass(){
    this.prefix = 'mhio'
    this.separator = ':'
    this.pino_instance = pino()
  }

  /**
   * Replace the base shared pino instance
   * This should only be done at startup, users will have reference to the original
   */
  static setPinoInstance(pino_instance){
    this.pino_instance = pino_instance 
  }

  static debugInstance(namespace) {
    if (rdebug(namespace).enabled) {
      return rdebug(namespace)
    }
    return noop
  }
 
  static loggerInstance(namespace) {
    return this.child({ namespace })
  }

  static loggerAndDebugInstance(namespace) {
    return {
      logger: this.loggerInstance(namespace),
      debug: this.debugInstance(namespace),
    }
  }

  /**
   * Disable the singleton logger instance (level above all log levels)
   * @returns Pino singleton instance
   */
  static disableLogs(){
    this.previous_level = this.pino_instance.level
    this.pino_instance.level = Infinity
    return this.pino_instance
  }

  /**
   * Sets the singleton logger instance back to an enabled level
   * @param {number} [level=30] The log level to return to, defaults to previous disabled level or 30
   * @returns Pino singleton instance
   */
  static enableLogs(level){
    this.pino_instance.level = level || this.previous_level || 30
    this.previous_level = null
    return this.pino_instance
  }

  /**
   * Returns a child logger for a namespace
   * @param {string} ns 
   * @returns New pino child instance of the singleton logger 
   */
  static child(ns){
    return this.pino_instance.child(ns)
  }

  constructor(prefix, separator, /*pino_instance,*/){
    this.prefix = prefix || this.constructor.prefix
    this.separator = separator || this.constructor.separator
    //this.pino_instance = pino_instance || this.constructor.pino_instance
  }

  joinNamespace(...args){
    const nsa = [ this.prefix, ...args ]
    return nsa.join(this.separator)
  }

  loggerInstance(namespace_suffix){
    const ns = this.joinNamespace(namespace_suffix)
    return this.constructor.loggerInstance(ns)
  }
 
  debugInstance(namespace_suffix){
    const ns = this.joinNamespace(namespace_suffix)
    return this.constructor.debugInstance(ns)
  }

  /**
   * Get a `logger` and `debug` instance for a namespace
   * @param {string}  namespace_suffix  - The namespace to append to the default prefix
   */ 
  ns(...args){ return this.loggerAndDebug(...args) }
  loggerAndDebug(...namespace_suffix){
    const ns = this.joinNamespace(...namespace_suffix)
    return this.constructor.loggerAndDebugInstance(ns)
  }

}

MhioLogger.initialiseClass()

module.exports = {
  default: MhioLogger,
  MhioLogger,
  Log: MhioLogger, // shortcut access
  noop,
  debug: rdebug,
  pino,
}
