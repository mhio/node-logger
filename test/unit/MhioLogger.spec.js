const { expect } = require('chai')
const { MhioLogger } = require('../../lib/MhioLogger')

describe('unit::MhioLogger', function(){

  it('should import a module', function(){
    expect(MhioLogger, 'module import').to.be.ok 
  })

  it('should have a default pino instance', function(){
    expect(MhioLogger.pino_instance, 'pino_instance').to.be.ok 
  })

  it('should have join a namespace to existing instance', function(){
    const Logger = new MhioLogger('test')
    expect(Logger.joinNamespace('two', 'ending')).to.equal('test:two:ending')
  })

})
