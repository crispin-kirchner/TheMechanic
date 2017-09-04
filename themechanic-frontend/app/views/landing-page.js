import LookupOrderFormView from 'views/lookup-order-form';

export default Mn.View.extend({
  template: require('templates/landing-page'),
  
  regions: {
    lookupOrderForm: '#lookup-order-form'
  },
  
  onRender: function() {
    this.showChildView('lookupOrderForm', new LookupOrderFormView());
  }
});
