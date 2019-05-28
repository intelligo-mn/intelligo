const expect = require('chai').expect;
const sinon = require('sinon');
const Intelligo = require('../');

let server;
let intelligo;
let USER_ID = '333';
let PAGE_ID = '111';

describe('Intelligo Messenger Bot Tests', () => {
    beforeEach(() => {
        const options = {
          PAGE_ACCESS_TOKEN: 'page_access_token',
          VALIDATION_TOKEN: 'validation_token',
          APP_SECRET: 'app_secret'
        };
    
        intelligo = new Intelligo.MessengerBot(options);
        server = sinon.fakeServer.create();
        server.autoRespond = true;
    });
    
    afterEach(() => {
        server.restore();
    });
    
    it('Create new bot instance with configuration.', () => {
        const options = {
          PAGE_ACCESS_TOKEN: 'page_access_token',
          VALIDATION_TOKEN: 'validation_token',
          APP_SECRET: 'app_secret'
        };
    
        intelligo = new Intelligo.MessengerBot(options);
        expect(intelligo.PAGE_ACCESS_TOKEN).to.equal('page_access_token');
        expect(intelligo.VALIDATION_TOKEN).to.equal('validation_token');
        expect(intelligo.APP_SECRET).to.equal('app_secret');
        
    });

    it('creates a bot instance', () => {
        expect(intelligo instanceof Intelligo.MessengerBot).to.equal(true);
    });

    it('throws an error if there are missing tokens', () => {
        expect(() => new Intelligo.MessengerBot()).to.throw(Error);
    });
    
    it('Init webhook', () => {
        expect(() => intelligo.initWebhook());
    });
    
    it('Training and answer.', () => {
        expect(intelligo.learn([
          { input: 'I feel great about the world!', output: 'happy' },
          { input: 'The world is a terrible place!', output: 'sad' },
        ]));
        
        expect(intelligo.answer('I feel great about the world!').toString()).to.equal('happy');
        expect(intelligo.answer('The world is a terrible place!').toString()).to.equal('sad');
    });
    
    it('Subscribe to messages sent by the user with the bot.on() method', () => {
    
    });
    
});
