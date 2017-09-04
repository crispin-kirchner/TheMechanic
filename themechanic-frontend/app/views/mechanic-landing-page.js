import LookupOrderFormView from 'views/lookup-order-form';
import CreateOrderButtonView from 'views/create-order-button';

export default Mn.View.extend({
  template: require('templates/mechanic-landing-page'),
  
  regions: {
    lookupOrderForm: '#lookup-order-form',
    createOrderButton: '#create-order-button'
  },
  
  onRender: function() {
    this.showChildView('lookupOrderForm', new LookupOrderFormView());
    this.showChildView('createOrderButton', new CreateOrderButtonView());
  }
});
