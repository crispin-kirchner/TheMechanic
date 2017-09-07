import { OrderCollection } from 'models/order';

const OrderItem = Mn.View.extend({
  
  tagName: 'tr',
  
  template: require('templates/pending-order-item')
  
});

const TableBody = Mn.CollectionView.extend({
  
  tagName: 'tbody',
  
  childView: OrderItem
  
});

export default Mn.View.extend({
  initialize: function(options) {
    
  },
  
  template: require('templates/pending-orders-list'),
  
  regions: {
    body: {
      el: 'tbody',
      replaceElement: true
    }
  },
  
  onRender: function() {
    var orderCollection = new OrderCollection();
    orderCollection.fetch();
    
    this.showChildView('body', new TableBody({
      collection: orderCollection
    }));
  }
  
});
