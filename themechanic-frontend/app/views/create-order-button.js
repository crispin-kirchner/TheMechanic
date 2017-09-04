export default Mn.View.extend({
  template: require('templates/create-order-button'),
  
  // set the container of the view to 100% such that the button will
  // also have the full column height
  attributes: {
    style: 'height:100%;'
  },
  
  events: {
    'click button': 'navigateToForm'
  },
  
  navigateToForm: function() {
    location.href = '#create-order';
  }
});
