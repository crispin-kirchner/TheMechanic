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

const CreateOrderButtonView = Mn.View.extend({
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
    this.showChildView('createOrderButton', new CreateOrderButtonView());
  }
});

const CreateNewOrderView = Mn.View.extend({
  template: require('templates/create-new-order-form')
});

const RouteController = Mn.Object.extend({
  initialize: function(application) {
    this.application = application;
  },
  
  createOrder: function() {
    if(!MECHANIC_MODE.get('mechanicMode')) {
      Backbone.history.navigate('#', {trigger: true, replace: true});
      return;
    }
    
    this.application.showView(new CreateNewOrderView());
  },
  
  dashboard: function() {
    if(MECHANIC_MODE.get('mechanicMode')) {
      Backbone.history.navigate('#mechanic-dashboard', {trigger: true, replace: true});
      return;
    }
    
    this.application.showView(new LandingPageView());
  },
  
  mechanicDashboard: function() {
    if(!MECHANIC_MODE.get('mechanicMode')) {
      Backbone.history.navigate('#', {trigger: true, replace: true});
      
      return;
    }
    
    this.application.showView(new MechanicLandingPageView());
  }
});

const Application = Mn.Application.extend({
  region: 'main.container',
  
  onStart: function() {
    let mechanicModeToggle = new MechanicModeToggle({MECHANIC_MODE: MECHANIC_MODE});
    mechanicModeToggle.render();
  
    let controller = new RouteController(this);
    
    let router = new Mn.AppRouter({
      controller: controller,
      
      appRoutes: {
        '': 'dashboard',
        'mechanic-dashboard': 'mechanicDashboard',
        'create-order': 'createOrder'
      }
    });
    
    Backbone.history.start();
  }
});

$(() => {
  let app = new Application();
  app.start();
});
