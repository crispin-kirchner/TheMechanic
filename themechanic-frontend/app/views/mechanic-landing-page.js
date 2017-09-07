import LookupOrderFormView from 'views/lookup-order-form';
import CreateOrderButtonView from 'views/create-order-button';
import PendingOrdersList from 'views/pending-orders-list';

export default Mn.View.extend({
  template: require('templates/mechanic-landing-page'),
  
  regions: {
    lookupOrderForm: '#lookup-order-form',
    createOrderButton: '#create-order-button',
    pendingOrdersList: '#pending-orders-list'
  },
  
  onRender: function() {
    this.showChildView('lookupOrderForm', new LookupOrderFormView());
    this.showChildView('createOrderButton', new CreateOrderButtonView());
    this.showChildView('pendingOrdersList', new PendingOrdersList());
  }
});
