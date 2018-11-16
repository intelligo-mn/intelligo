const expect = require('chai').expect;
const Intelligo = require('../src/intelligo');

describe('Intelligo Framework', () => {
  it('Create new bot', () => {
    const options = {
      PAGE_ACCESS_TOKEN: '1234',
      VALIDATION_TOKEN: '5678',
      APP_SECRET: 'foobar'
    };

    const bot = new Intelligo(options);
    expect(() => new Intelligo(options)).to.not.throw();
    expect(bot instanceof Intelligo).to.equal(true);
  });

  it('throws an error if there are missing tokens', () => {
    expect(() => new Intelligo()).to.throw(Error);
  });
});