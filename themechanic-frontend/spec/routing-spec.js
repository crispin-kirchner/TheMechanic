const webdriver = require('selenium-webdriver');
const sd = require('selenium-drivers');
const By = webdriver.By;

const express = require('express');
const app = express();

const host = 'localhost';
const port = 3000;

const browser = 'firefox';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000

/**
 * To be used as the reject function of a promise, to indicate spec
 * failure if the promise is not resolved.
 * 
 * Usage:
 *     somePromise.then(done, failAndDone(done) );
 */
function failAndDone(done) {
  return function(reason) {
    fail(reason);
    done();
  }
}

/**
 * Navigates the given driver to the url relative to the host and port
 * configured in the header of the spec.
 */
function goTo(driver, url) {
  var urlTail = url === undefined
              ? ''
              : '/#' + url;
  
  return driver.get('http://' + host + ':' + port + urlTail);
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
      
      this.driver.findElements(By.css('div.alert')).then(elements => {
        expect(elements.length).toEqual(1);
        
        elements[0].getText().then(function(text) {
          expect(text.toLowerCase().indexOf('creating')).not.toBe(-1);
          
          done();
          
        }, failAndDone(done) );
        
      }, failAndDone(done) );
    });
  });
  
  it('should create an alert on navigating the dashboard', function(done) {
    goTo(this.driver, 'mechanic-dashboard').then(() => {
      this.driver.findElements(By.css('div.alert')).then(elements => {
        expect(elements.length).toEqual(1);
        
        elements[0].getText().then(text => {
          expect(text.toLowerCase().indexOf('mechanic dashboard')).not.toBe(-1);
          
          done();
          
        }, failAndDone(done) );
        
      }, failAndDone(done) );
    });
  });
  
  it('should react on sign in', function(done) {
    var findSignIn = () => {
      return this.driver.findElement(By.css('#mechanic-mode-toggle a'));
    }
    
    goTo(this.driver).then(() => {
      var signIn = findSignIn();
      
      signIn.getText().then(text => {
        expect(text).toEqual('Sign in');
      }, failAndDone(done) );
      
      signIn.click().then(() => {
        signIn = findSignIn();
        
        signIn.getText().then(text => {
          expect(text).toEqual('Sign out');
          
          this.driver.findElement(By.id('create-order-button')).click().then(() => {
            this.driver.findElement(By.tagName('h1')).getText().then(text => {
              
              expect(text).toEqual('Create Order');
              
              done();
              
            }, failAndDone(done) );
            
          }, failAndDone(done) );
          
        }, failAndDone(done) );
        
      }, failAndDone(done) );
    });
  });
  
  afterAll(function() {
    this.driver.quit();
    this.server.close();
  });
});
