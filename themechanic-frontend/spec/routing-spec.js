const webdriver = require('selenium-webdriver');
const sd = require('selenium-drivers');
const By = webdriver.By;

const express = require('express');
const app = express();

const host = 'localhost';
const port = 3000;

const browser = 'firefox';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000

function failAndDone(done) {
  return function(reason) {
    fail(reason);
    done();
  }
}

function goTo(driver, url) {
  var urlTail = url === undefined
              ? ''
              : '/#' + url;
  
  return driver.get('http://' + host + ':' + port + urlTail)
}

describe('Page', function() {
  
  beforeAll(function(done) {
    app.use(express.static('public'));
    this.server = app.listen(port, host);
    
    sd.init({ browserName: browser }).then(() => {
      this.driver = new webdriver.Builder()
        .forBrowser(browser)
        .build();
      
      done();
    });
  });
  
  it('should have the correct title', function(done) {
    
    goTo(this.driver).then(() => {
    
      this.driver.getTitle().then( function(title) {
        expect(title).toBe('The Mechanic');
        
        done();
      });
      
    }, failAndDone(done) );
  });
  
  it('should not have a create order button', function(done) {
    goTo(this.driver).then(() => {
      this.driver.findElement(By.id('create-order-button')).then(function(element) {
        
        fail('create order button exists');
        
        done();
        
      }, done );
    });
  });
  
  it('should create an alert on navigating the create-order form', function(done) {
    goTo(this.driver, 'create-order').then(() => {
      
      this.driver.findElements(By.css('div.alert')).then(function(elements) {
        expect(elements.length).toEqual(1);
        
        elements[0].getText().then(function(text) {
          expect(text.toLowerCase().indexOf('creating')).not.toBe(-1);
          
          done();
        });
      }, failAndDone(done) );
    });
  });
  
  afterAll(function() {
    this.driver.quit();
    this.server.close();
  });
});
