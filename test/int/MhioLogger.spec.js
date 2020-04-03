const { expect } = require('chai')
const { MhioLogger, noop } = require('../../lib/MhioLogger')

describe('int::MhioLogger', function(){

  it('should static', function(){
    expect(MhioLogger.child('newns')).to.be.ok
    expect(MhioLogger.debugInstance('full:ending')).to.equal(noop)
    expect(MhioLogger.loggerInstance('a:b').debug).to.be.a('function')
    const res = MhioLogger.loggerAndDebugInstance('b:c')
    expect(res.debug).to.be.a('function')
    expect(res.logger).to.be.an('object')
    expect(res.logger.debug).to.be.a('function')
    expect(MhioLogger.disableLogs(), 'disable logs').to.be.ok
    expect(MhioLogger.enableLogs(10), 'enable logs').to.be.ok
  })
  
  it('should instance', function(){
    const Logger = new MhioLogger('test')
    expect(Logger.loggerInstance('ending').debug).to.be.a('function')
    expect(Logger.debugInstance('ending')).to.be.a('function')
    expect(Logger.loggerAndDebug('ending')).to.have.keys(['logger', 'debug' ])
  })

})
