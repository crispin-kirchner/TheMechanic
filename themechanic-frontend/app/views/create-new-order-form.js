function toObject(serializedArray) {
  var result = {};
  
  serializedArray.forEach(element => {
    result[element.name] = element.value;
  });
  
  return result;
}

const Order = Backbone.Model.extend({
  defaults: function() {
    return { checkInDate: new Date() };
  },
  
  urlRoot: 'http://localhost:1337/order'
});

export default Mn.View.extend({
  template: require('templates/create-new-order-form'),
  
  events: {
    'submit form': 'postToBackend'
  },
  
  postToBackend: function(event) {
    event.preventDefault();
    
    // gather data from the form
    var formData = toObject( $(event.target).serializeArray() );
    
    // POST to backend
    new Order(formData).save();
  }
});
