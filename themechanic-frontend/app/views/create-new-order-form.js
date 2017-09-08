import { Order } from 'models/order';

function toObject(serializedArray) {
  var result = {};
  
  serializedArray.forEach(element => {
    result[element.name] = element.value;
  });
  
  return result;
}

export default Mn.View.extend({
  template: require('templates/create-new-order-form'),
  
  events: {
    'submit form': 'postToBackend'
  },
  
  ui: {
    create: '#submit'
  },
  
  disableCreateButton: function() {
    var createButton = this.getUI('create');
    createButton.attr('disabled', 'disabled');
    createButton.attr('aria-disabled', 'true');
  },
  
  enableCreateButton: function() {
    var createButton = this.getUI('create');
    createButton.removeAttr('disabled');
    createButton.removeAttr('aria-disabled');
  },
  
  postToBackend: function(event) {
    this.disableCreateButton();
    
    // gather data from the form
    var formData = toObject( $(event.target).serializeArray() );
    
    // POST to backend
    var newOrder = new Order(formData);
    newOrder.save()
      .done(() => {
        console.log('successfully created order. Number: ' + newOrder.get('number'));
      })
      .fail(() => {
        console.log('failed creating order, please try again later');
        enableCreateButton();
      });
      
    event.preventDefault();
  }
});
