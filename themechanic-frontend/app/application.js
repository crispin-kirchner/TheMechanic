import RouteController from 'route-controller';
import MechanicModeToggle from 'views/sign-in-button';
import SigninAlert from 'views/signin-alert';

const AuthorizationPlaceholder = Backbone.Model.extend({
  mechanicMode: false,
  
  toggle: function() {
    this.set('mechanicMode', !this.get('mechanicMode'));
  }
});

export default Mn.Application.extend({
  region: 'main.container',
  
  onStart: function() {
    this.authorizationPlaceholder = new AuthorizationPlaceholder();
    
    let mechanicModeToggle = new MechanicModeToggle({application:  this});
    
    mechanicModeToggle.render();
  
    let controller = new RouteController({application: this});
    
    let router = new Mn.AppRouter({
      controller: controller,
      
      appRoutes: {
        '': 'dashboard',
        'mechanic-dashboard': 'mechanicDashboard',
        'create-order': 'createOrder'
      }
    });
    
    Backbone.history.start();
  },
  
  isAuthorized: function() {
    return this.authorizationPlaceholder.get('mechanicMode');
  },
  
  signInPopup: function(options) {
    let signinAlert = new SigninAlert({ model: new Backbone.Model({text: options.content}) })
    .render()
    .on('closed.bs.alert', () => {signinAlert.remove();});
    
    $('#sign-in-button a').popover({
      content: 'You can sign in here',
      placement: 'bottom',
      trigger: 'focus'
    })
    .on('hidden.bs.popover', function() {
      $(this).popover('dispose');
    });
    
    $('#sign-in-button a').focus();
  }
});
