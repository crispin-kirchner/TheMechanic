const webdriver = require('selenium-webdriver');
const By = webdriver.By;

const express = require('express');
const app = express();

const host = 'localhost';
const port = 3000;

describe('Routing', function() {
  
  beforeAll(function() {
    
    app.use(express.static('public'));
    this.server = app.listen(port, host);
    
    this.driver = new webdriver.Builder()
      .forBrowser('firefox')
      .build();
  });
  
  it('should have the correct title', function() {
    this.driver.get('http://' + host + ':' + port);
    
    this.driver.getTitle().then( function(title) {
      expect(title).toBe('The Mechanic');
    });
  });
  
  it('should not have a create order button', function() {
    this.driver.findElement(By.id('create-order-button')).then(function(element) {
      fail('create order button exists');
    });
  });
  
  it('should create an alert on navigating the protected area', function() {
    this.driver.get('http://' + host + ':' + port + '/#create-order');
    
    this.driver.findElements(By.css('div.alert')).then(function(elements) {
      expect(elements.length).toEqual(1);
    });
  });
  
  afterAll(function() {
    this.server.close();
  });
});
