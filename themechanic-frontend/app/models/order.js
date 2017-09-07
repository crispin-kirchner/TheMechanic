import Settings from 'settings';

export const Order = Backbone.Model.extend({
  
  defaults: function() {
    return { checkInDate: new Date() };
  },
  
  urlRoot: Settings.backend + '/order'
  
});

export const OrderCollection = Backbone.Collection.extend({
  
  model: Order,
  
  url: Settings.backend + '/order'
  
});
