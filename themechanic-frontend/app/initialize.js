import MechanicModeToggle from 'components/MechanicModeToggle';

const MechanicModeModel = Backbone.Model.extend({
  mechanicMode: false,
  
  toggle: function() {
    this.set('mechanicMode', !this.get('mechanicMode'));
  }
});

let MECHANIC_MODE = new MechanicModeModel();

const LookupOrderFormView = Mn.View.extend({
  template: require('templates/lookup-order-form')
});

const mainRegion = new Mn.Region({
  el: 'main.container'
});

const CreateOrderButton = Mn.View.extend({
  template: require('templates/create-order-button'),
  
  attributes: {
    style: 'height:100%;'
  },
  
  events: {
    'click button': 'navigateOnClick'
  },
  
  navigateOnClick: function(event) {
    event.preventDefault();
  }
});

const LandingPageView = Mn.View.extend({
  template: require('templates/landing-page'),
  
  regions: {
    lookupOrderForm: '#lookup-order-form',
    createOrderButton: '#create-order-button'
  },
  
  onRender: function() {
    this.showChildView('lookupOrderForm', new LookupOrderFormView());
    this.showChildView('createOrderButton', new CreateOrderButton());
  }
});

$(() => {
  let mechanicModeToggle = new MechanicModeToggle({MECHANIC_MODE: MECHANIC_MODE});
  mechanicModeToggle.render();
  mainRegion.show(new LandingPageView({model: MECHANIC_MODE}));
});
