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

const MAIN_REGION = new Mn.Region({
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
    MAIN_REGION.show(new CreateNewOrderView());
  }
});

const LandingPageView = Mn.View.extend({
  template: require('templates/landing-page'),
  
  regions: {
    lookupOrderForm: '#lookup-order-form'
  },
  
  onRender: function() {
    this.showChildView('lookupOrderForm', new LookupOrderFormView());
  }
});

const MechanicLandingPageView = Mn.View.extend({
  template: require('templates/landing-page-mechanic'),
  
  regions: {
    lookupOrderForm: '#lookup-order-form',
    createOrderButton: '#create-order-button'
  },
  
  onRender: function() {
    this.showChildView('lookupOrderForm', new LookupOrderFormView());
    this.showChildView('createOrderButton', new CreateOrderButton());
  }
});

const CreateNewOrderView = Mn.View.extend({
  template: require('templates/create-new-order-form')
});

function changePageOnModeSwitch() {
  if(MECHANIC_MODE.get('mechanicMode')) {
    var view = new MechanicLandingPageView();
  }
  else {
    var view = new LandingPageView();
  }
  
  MAIN_REGION.show(view);
}

$(() => {
  let mechanicModeToggle = new MechanicModeToggle({MECHANIC_MODE: MECHANIC_MODE});
  mechanicModeToggle.render();
  
  MECHANIC_MODE.on('change:mechanicMode', changePageOnModeSwitch);
  
  MAIN_REGION.show(new LandingPageView({model: MECHANIC_MODE}));
});
